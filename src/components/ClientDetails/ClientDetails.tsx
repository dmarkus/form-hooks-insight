import * as React from "react";
import { useForm } from "react-hook-form";
import { Client } from "../../types/client";
import { clientSchema } from "../../types/client.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { YesNoInput } from "../YesNoInput/YesNoInput";
import { useWatch } from "react-hook-form";
import { Advisor } from "../../types/advisor";

export const ClientDetails = () => {
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Client>({ resolver: yupResolver(clientSchema), mode: "onBlur" });

  const isNewsletterAllowed = useWatch({
    control,
    name: "isNewsletterAllowed",
    defaultValue: false,
  });
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input id="firstName" {...register("firstName")} maxLength={50} />
      <ErrorMessage>{errors.firstName?.message}</ErrorMessage>

      <label htmlFor="lastName">Last Name</label>
      <input id="lastName" {...register("lastName")} maxLength={50} />
      <ErrorMessage>{errors.lastName?.message}</ErrorMessage>

      <label htmlFor="gender">Gender</label>
      <select id="gender" {...register("gender")}>
        <option value="" />
        <option value="female">female</option>
        <option value="male">male</option>
      </select>
      <ErrorMessage>{errors.gender?.message}</ErrorMessage>

      <label htmlFor="advisor">Advisor</label>
      <select id="advisor" {...register("advisor")}>
        <option value="" />
        <option value={Advisor.James}>James</option>
        <option value={Advisor.Mary}>Mary</option>
      </select>
      <ErrorMessage>{errors.advisor?.message}</ErrorMessage>

      <button
        type="button"
        onClick={() => {
          setValue("advisor", "james");
        }}
      >
        Put me!
      </button>

      <label htmlFor="isNewsletterAllowed">Join our mailing list</label>
      <YesNoInput<Client> id="isNewsletterAllowed" control={control} name="isNewsletterAllowed" />
      <ErrorMessage>{errors.isNewsletterAllowed?.message}</ErrorMessage>

      {isNewsletterAllowed && (
        <>
          <label htmlFor="email">Email</label>
          <input id="email" {...register("email")} maxLength={50} />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </>
      )}

      <input type="submit" />
    </form>
  );
};
