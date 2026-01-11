export type TUser = {
    name: string,
    email: string,
    password: string,
    isBlocked?: boolean,
    isDeleted?: boolean,
    createdAt?: Date,
    updatedAt?: Date,
}

export type TUserLogin = {
    email: string,
    password: string
}