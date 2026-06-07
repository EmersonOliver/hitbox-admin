export interface JwtPayload {
  sub: string;
  name: string;
  fullName: string;
  email: string;
  companyName: string;
  exp: number;
  'X-User-Role': string;
  'X-Company-Id': string;
}