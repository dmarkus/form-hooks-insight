export interface Client {
  firstName: string;
  lastName: string;
  // city: string;
  gender: "male" | "female";

  isNewsletterAllowed: boolean;
  email?: string;
}
