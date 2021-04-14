import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { Client } from "../../types/client";

export const ClientDetails = () => {
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Client>();

  const onSubmit = handleSubmit((data) => console.log(data));
  const firstName = useWatch({
    control,
    name: ["firstName", "lastName", ], // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
  });

  console.log("firstName", firstName);
  return (
    <form onSubmit={onSubmit}>
      <label>First Name</label>
      <input {...register("firstName")} maxLength={50} />
      <label>Last Name</label>
      <input {...register("lastName")} maxLength={50} />
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
