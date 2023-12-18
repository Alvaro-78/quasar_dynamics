export interface User {
  data?: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
  email: string;
  password: string;
}
