export interface IUiSliceInitialState {
  themeMode: string;
  isOpenMenu: boolean;
}
export interface IAuthSliceInitialState {
  status: "checking" | "authenticated" | "not-authenticated";
  token: string | null;
  username: string | null;
  email: string | null;
  uid: string | null;
}
export interface ILoginPayload {
  token: string;
  username: string;
  email: string;
  uid: string;
}
