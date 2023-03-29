export interface ICustomFetchBaseQueryError {
  status: number;
  data?: {
    ok?: boolean;
    msg: string;
  };
  error?: string;
}
export interface IAuthLayoutProps {
  children: React.ReactNode;
  title: string;
}
export interface IChildrenProps {
  children: React.ReactNode;
}
export interface IMessageAlerProps {
  message: string;
}
export interface IAuthLayoutProps {
  children: React.ReactNode;
  title: string;
}
export interface IUser {
  ok: boolean;
  uid: string;
  username: string;
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
