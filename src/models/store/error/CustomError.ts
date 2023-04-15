export interface ICustomFetchBaseQueryError {
  status: number;
  data?: {
    ok?: boolean;
    msg: string;
  };
  error?: string;
}
