import { IBasePresenter } from "@/interfaces/presenters/IBasePresenter";

export class BasePresenter implements IBasePresenter {

    presenterMensagemParaRespostaHttp(message: string, sucess: boolean): any {
        return {
            sucess: sucess,
            message: message,
        };
    }

}