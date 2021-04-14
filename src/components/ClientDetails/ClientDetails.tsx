import * as React from "react";
import { useForm } from "react-hook-form";
import { Client } from "../../types/client";
import { clientSchema } from "../../types/client.schema";
import { yupResolver } from "@hookform/resolvers/yup";

export const ClientDetails = () => {
  const {
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
        <p>{errors.firstName?.message}</p>
      <label>Last Name</label>
      <input {...register("lastName")} maxLength={50} />
        <label>Gender</label>
      <select {...register("gender")}>
        <option value="female">female</option>
        <option value="male">male</option>
      </select>

      <button
        type="button"
        onClick={() => {
          setValue("firstName", "luo");
          console.log(errors);
        }}
      >
        SetValue
      </button>
    </form>
  );
};
