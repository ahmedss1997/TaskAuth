export interface iLogin {
  token: string;
  user: users;
}

export interface users {
  id?: number;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  verifyCode: number;
  password: string;
}
