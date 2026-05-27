export type ApiResponse<T> = {
    success: boolean,
    message: string,
    data: T,
}

export type Admin = {
    id: number,
    email: string,
    roleName: string,
    createdAt: string,
    lastLogin: string,
}

export type CreateAdminParams = {
    email: string,
    password: string,
}
