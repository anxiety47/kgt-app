export enum UserRole {
  ADMIN = 'Administrator',
  KGT_MEMBER = "Członek KGT",
  TRAINEE = "Kursant",
  GUEST = "Gość" // default for new user 
}

export interface User {
  userId: number;
  email: string;
  token: string;
  name: string;
  surname: string;
  roles: UserRole[];
}