import {ContextModel} from "../models/context.model";

export interface UserResponse {
    user: {
        id: string;
        context: ContextModel
    };
}