import * as yup from "yup";
import { SchemaOf } from "yup";
import { Client } from "./client";
import { Advisor } from "./advisor";

export const clientSchema: SchemaOf<Client> = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  gender: yup.mixed().oneOf(["male", "female"]).required(),
  advisor: yup.mixed().oneOf(Object.values(Advisor)).notRequired(),
  isNewsletterAllowed: yup.boolean().required(),
  email: yup.string().when("isNewsletterAllowed", {
    is: true,
    then: yup.string().email().required(),
    otherwise: yup.string().notRequired(),
  }),
});
