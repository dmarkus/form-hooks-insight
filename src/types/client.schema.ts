import * as yup from "yup";
import { SchemaOf } from "yup";
import { Client } from "./client";

export const clientSchema: SchemaOf<Client> = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  gender: yup.mixed().oneOf(["male", "female"]).required(),
  isNewsletterAllowed: yup.boolean().required(),
  email: yup.string().when("isNewsletterAllowed", {
    is: true,
    then: yup.string().email().required(),
    otherwise: yup.number().notRequired(),
  }),
});
