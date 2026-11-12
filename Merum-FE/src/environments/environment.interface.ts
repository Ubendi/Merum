export interface Environment {
  production: boolean;
  apiUrl: string;
  fileUrl: string;
  bypassSSL?: boolean;
}
