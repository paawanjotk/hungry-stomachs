import { IUser } from "./src/models/users.models"

declare global {
    namespace Express {
        interface Request {
            user: IUser
        }
    }
}

export {}