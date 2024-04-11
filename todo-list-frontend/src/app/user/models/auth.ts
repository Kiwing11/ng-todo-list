export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
}

export interface IRegisterResponse {
  success: boolean;
  message: string;
}
