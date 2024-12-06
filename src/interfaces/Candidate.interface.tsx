//Interface for the Candidate objects returned by the API:

export default interface Candidate {
    readonly login: string | null;
    readonly avatar_url: string | null;
    readonly location: string | null;
    readonly email: string | null;
    readonly company: string | null;
    readonly bio: string | null;
}