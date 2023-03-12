export interface AuthToken {
  creationDate: Date;
  access: string;
  refresh: string;
  tokenType: string;
  expiresIn: number;
  scope: string;
}
