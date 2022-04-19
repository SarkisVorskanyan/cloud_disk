export interface UserDataType {
    token: string,
    user: UserType
}

export interface UserType {
    id: string,
    email: string,
    diskSpace: number,
    usedSpace: number    
}
