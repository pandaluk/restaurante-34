import { BaseEntity } from "@/entities/BaseEntity";
import { IBasePresenter } from "@/interfaces/presenters/IBasePresenter";

import { format } from "date-fns";

export class BasePresenter implements IBasePresenter {

    static formatEntity<T extends BaseEntity>(entity: T): any {
        const formattedEntity: any = { ...entity };
        formattedEntity.createdAt = format(new Date(entity.createdAt), "dd/MM/yyyy HH:mm:ss");
        formattedEntity.updatedAt = format(new Date(entity.updatedAt), "dd/MM/yyyy HH:mm:ss");
        return formattedEntity;
    }

    static presenterEntityParaRespostaHttp<T extends BaseEntity>(
        message: string,
        success: boolean,
        entity: T
    ): any {
        if (success) {
            return {
                success: true,
                message: message,
                data: BasePresenter.formatEntity(entity)
            };
        } else {
            return {
                success: false,
                message: message
            };
        }
    }

    static presenterEntitysParaRespostaHttp<T extends BaseEntity>(
        message: string,
        success: boolean,
        entities: T[]
    ): any {
        if (success) {
            let data: any[];
            if (Array.isArray(entities)) {
                data = entities.map(entity => BasePresenter.formatEntity(entity));
            } else {
                data = [];
            }

            return {
                success: true,
                message: message,
                data: data
            };
        } else {
            return {
                success: false,
                message: message
            };
        }
    }

    presenterMensagemParaRespostaHttp(message: string, sucess: boolean): any {
        return {
            sucess: sucess,
            message: message,
        };
    }


}