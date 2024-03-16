import * as jwt from "jsonwebtoken";
import * as jwkToPEM from "jwk-to-pem";
import { NextFunction, Request, Response } from "express";

class CognitoVerifier {
    private jwksUrl: string;

    constructor() {
        this.jwksUrl = process.env.COGNITO_JWKS_URL || "";
    }

    private async getSigningKey(kid: string): Promise<string> {
        try {
            const response = await fetch(this.jwksUrl);
            if (!response.ok) {
                throw new Error("Failed to fetch JWKS from Amazon Cognito");
            }

            const jwks = await response.json();

            const signingKey = jwks.keys.find(
                (key: { kid: string }) => key.kid === kid
            );
            if (!signingKey) {
                throw new Error("Unable to find valid key");
            }

            const publicKey = jwkToPEM.default(signingKey);

            return publicKey;
        } catch (error: any) {
            throw new Error(
                `Error fetching JWKS from Amazon Cognito: ${error?.message}`
            );
        }
    }

    async verifyCognitoJWT(
        req: Request & { decodedJWT: any },
        res: Response,
        next: NextFunction
    ): Promise<any> {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            res.status(401).send("Authorization header not provided");
            throw new Error("Authorization header not provided");
        }

        const decodedToken = jwt.decode(token, { complete: true });

        if (!decodedToken) {
            res.status(401).send("Invalid token");
            throw new Error("Invalid token");
        }

        const {
            header: { kid },
        } = decodedToken as { header: { kid: string }; payload: any };

        const signingKey = await this.getSigningKey(kid);

        const verifiedPayload = jwt.verify(token, signingKey, {
            algorithms: ["RS256"],
        });

        req.decodedJWT = verifiedPayload;
        next();
    }
}

export { CognitoVerifier };
