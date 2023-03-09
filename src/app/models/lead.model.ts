export interface LeadModel {
    readonly activityIds: string[];
    readonly annualRevenue: number;
    readonly companySize: {
        dev: number;
        fe: number;
        total: number;
    }
    readonly hiring: {
        active: boolean;
        junior: boolean;
        talentProgram: boolean;
    }
    readonly industry: string;
    readonly linkedinLink: string;
    readonly location: string;
    readonly name: string;
    readonly websiteLink: string;
}
