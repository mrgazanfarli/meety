export interface ILoginCredentials {
    email: string;
    password: string;
}

export interface IPasswordChangeRq {
    oldPassword: string;
    password: string;
    confirmPassword: string;
}

export interface IPasswordResetRq {
    email: string;
}

export interface IPasswordSetRq {
    password: string;
    confirmPassword: string;
    token: string;
}
