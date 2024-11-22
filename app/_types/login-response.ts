export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    name: string;
    login: string;
  };
}
