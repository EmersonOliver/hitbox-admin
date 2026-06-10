export interface ProfileResponse {
    id: string;
    name: string;
    lastname: string;
    fullName: string;
    phone:string;
    email: string;
    role: string;
    active: boolean;

    company: {
        id: string;
        name: string;
    };
}