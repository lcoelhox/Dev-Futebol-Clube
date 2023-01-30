export default interface IUserJWT {
  data: {
    id?: number;
    email?: string;
    password?: string;
    role?: string;
  };
  exp?: number;
  iat?: number;
  error?: string;
}
