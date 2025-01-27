export type UserDetailsType = {
  username: string;
  email?: string;
};

export type AuthInitialState = {
  user: UserDetailsType | null; // You can replace `any` with the actual type of user
  token: string | null;
};
