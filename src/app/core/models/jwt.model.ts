import { CompanySelectionResponse } from "../../pages/company/models/company.selection";

export interface JwtPayload {
  sub: string;
  name: string;
  fullName: string;
  email: string;
  companyName: string;
  exp: number;
  teamName: string;
  companies: CompanySelectionResponse[];
  permissions: string[];
  'X-User-Role': string;
  'X-Company-Id': string;
}