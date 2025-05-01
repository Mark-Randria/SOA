export interface IUser {
  immatriculation: number;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  role: string;
}

export interface IDeletedUserResponse {
  success: boolean;
  message: string;
}
