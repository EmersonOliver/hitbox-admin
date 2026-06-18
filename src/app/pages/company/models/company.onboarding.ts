import { Company } from "./company.model";

export interface OnboardingResponse {
    company: Company;
    token: string;
}