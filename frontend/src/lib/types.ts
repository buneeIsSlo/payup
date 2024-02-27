export type TUserData = {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
};

export type TUserProfileData = Omit<TUserData, "password">;

export type TChildren = {
    children?: React.ReactNode
}