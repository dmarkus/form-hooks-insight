import * as React from "react";
import { Control, FieldPath } from "react-hook-form";
import { Controller } from "react-hook-form";

interface YesNoInputProps<FormValues> {
  name: FieldPath<FormValues>;
  control: Control<FormValues>;
}

export const YesNoInput = <FormValues,>({
  control,
  name,
}: YesNoInputProps<FormValues>) => (
  <Controller
    defaultValue=""
    control={control}
    name={name}
    render={({ field }) => (
      <input
        onChange={(e) => {
          field.onChange(e.target.checked);
        }}
        value={field.value ? String(field.value) : ""}
        type="checkbox"
      />
    )}
  />
);
