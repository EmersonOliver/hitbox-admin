export interface TeamMemberResponse {
    membershipId: string;
    teamId: string;
    userId: string;
    name: string;
    lastname: string;
    fullName: string;
    email: string;
    role: string;
    active: boolean;
    joinedAt: Date;
}