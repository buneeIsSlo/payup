export type TUserData = {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
};

export type TUserProfileData = Omit<TUserData, "password">;

export type TLoginUserData = Pick<TUserData, "username" | "password">;

export type TChildren = {
    children: React.ReactNode
}