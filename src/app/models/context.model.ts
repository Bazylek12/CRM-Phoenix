import {FirebaseModel} from "./firebase.model";

export interface ContextModel {
    role: string;
    iss: string;
    aud: string;
    auth_time: number;
    user_id: string;
    sub: string;
    iat: number;
    exp: number;
    email: string;
    email_verified: boolean;
    firebase: FirebaseModel;
    uid: string;
}