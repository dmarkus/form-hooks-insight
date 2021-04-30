import * as React from "react";
import { Control, FieldPath } from "react-hook-form";
import { Controller } from "react-hook-form";

interface YesNoInputProps<FormValues> {
  id: string;
  name: FieldPath<FormValues>;
  control: Control<FormValues>;
}

export const YesNoInput = <FormValues,>({
  id,
  name,
  control,
}: YesNoInputProps<FormValues>) => (
  <Controller
    defaultValue={false}
    control={control}
    name={name}
    render={({ field }) => (
      <input
        id={id}
        onChange={(e) => {
          field.onChange(e.target.checked);
        }}
        value={field.value ? String(field.value) : ""}
        type="checkbox"
      />
    )}
  />
);
