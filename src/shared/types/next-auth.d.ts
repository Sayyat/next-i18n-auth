export interface IUser {
    id?: string;
    access: string;
    refresh: string;
}

declare module "next-auth" {
    interface Session {
        user: IUser;
        access: string;
    }

    interface JWT {
        access: string;
        refresh: string;
        user: IUser; // Store your custom user data in JWT
    }
}
