import {IdentitiesModel} from "./identities.model";

export interface FirebaseModel {
    readonly identities: IdentitiesModel;
    readonly sign_in_provider: string;
}