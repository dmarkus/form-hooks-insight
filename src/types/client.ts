export interface Client {
  firstName: string;
  lastName: string;
  gender: "male" | "female";

  isNewsletterAllowed: boolean;
  email?: string;
}
