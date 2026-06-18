export interface LoginResponse {

    user: string;
    userName:string;
    token: string;
    email: String;
    companyId: string;
    firstLogin: boolean;
    onboardingPending:boolean;
    companies:any[]
}