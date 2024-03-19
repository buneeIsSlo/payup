export type TUserData = {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
};

export type TUserProfileData = Omit<TUserData, "password">;

export type TLoginUserData = Pick<TUserData, "username" | "password">;

export type TUpdateUserData = Partial<TUserData>;

export type TTransferMoney = {
    amount: number;
    to: string;
}

export type TChildren = {
    children: React.ReactNode
}