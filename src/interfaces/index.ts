export interface ICustomFetchBaseQueryError {
  status: number;
  data?: {
    ok?: boolean;
    msg: string;
  };
  error?: string;
}
export interface IChildrenProps {
  children: React.ReactNode;
}
export interface IUser {
  ok: boolean;
  uid: string;
  username: string;
  email: string;
  token: string;
}
export interface ILoginCredentials {
  email: string;
  password: string;
}
export interface IRegisterCredentials {
  email: string;
  password: string;
  username: string;
}
