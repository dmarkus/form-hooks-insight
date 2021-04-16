export interface Client {
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  advisor?: string;
  isNewsletterAllowed: boolean;
  email?: string;
}
