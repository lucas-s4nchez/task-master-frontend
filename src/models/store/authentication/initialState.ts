export interface IAuthSliceInitialState {
  status: "checking" | "authenticated" | "not-authenticated";
  token: string | null;
  username: string | null;
  email: string | null;
  uid: string | null;
}
