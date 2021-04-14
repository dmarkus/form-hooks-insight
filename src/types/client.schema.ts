import * as yup from "yup";
import { SchemaOf } from "yup";
import { Client } from "./client";

export const clientSchema: SchemaOf<Client> = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  city: yup.string().required(),
  gender: yup.mixed().oneOf(["male", "female"]).required(),
  age: yup.number().positive().integer().required(),
});
