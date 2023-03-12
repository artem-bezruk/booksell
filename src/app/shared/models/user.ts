import {AuthToken} from './authToken';
export interface User {
  email: string;
  tokens: AuthToken;
}
