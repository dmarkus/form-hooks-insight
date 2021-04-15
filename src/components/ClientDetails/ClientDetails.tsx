import * as React from "react";
import { useForm } from "react-hook-form";
import { Client } from "../../types/client";
import { clientSchema } from "../../types/client.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { YesNoInput } from "../YesNoInput/YesNoInput";

export const ClientDetails = () => {
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Client>({ resolver: yupResolver(clientSchema), mode: "onBlur" });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form onSubmit={onSubmit}>
      <label>First Name</label>
      <input {...register("firstName")} maxLength={50} />
      <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
      <label>Last Name</label>
      <input {...register("lastName")} maxLength={50} />
      <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
      <label>Gender</label>
      <select {...register("gender")}>
        <option></option>
        <option value="female">female</option>
        <option value="male">male</option>
      </select>
      <ErrorMessage>{errors.gender?.message}</ErrorMessage>

      <label>Join our mailing list</label>
      <YesNoInput<Client> control={control} name="isNewsletterAllowed" />
      <ErrorMessage>{errors.isNewsletterAllowed?.message}</ErrorMessage>

      <input type="submit" />
    </form>
  );
};
