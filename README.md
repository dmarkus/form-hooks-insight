# (Introduction)

# Why talk again about library to build forms?
Forms are common feature on frontend for most applications. 
There is extremely important to find easy and flexible tool to build them.
Many forms are incredibly simple and required only validation user data and retrieve it on submit.
However, in any enterprise application sooner or later developer have to make some more complicated work.

We started work with [redux-form](https://redux-form.com/) which was nice.
Later community rightly notice that: there is no need to keep form data in [Redux](https://redux.js.org/). 
It's completely unnecessary.
So [Formik](https://formik.org/) was created. It is smaller than redux-forms and more effective.

The next one is React-hook-form which mount even faster and use absolutely minimal number of rerender.
It's also half smaller than previous libraries. 

# What we need?
It's not good when library make too much magic. 
Later it's very expensive and difficult to maintain custom features. 
To avoid unnecessary boilerplate Developers need help with: 
1. Initially getting values to form
2. Watching some selected fields or to get its value on demand
3. Set selected field in time when form is partially filled
4. Validate and display error messages
5. Handle submit with all values

We will check if  react-hook-form gracefully handle that demands.

# Performance
To visually see when form is rerender we can use DevTool highlight updates.

If we don't need watchers or validations on `onChange` event 
than changing single field doesn't cause rerendering other fields nor form component.

# Typescript
Library is natively built with TS. It's possible to declare model type and get full support from TS.
```tsx
      <button
        type="button"
        onClick={() => {
          setValue("advisor", "james"); // ✅
          setValue("advisor", true); // ❌: "true" is not string
          setValue("isNewsletterAllowed", "yes");  // ❌: "yes" is not boolean
          setValue("city", true); // ❌: property city does not exist
          console.log(errors.city); // ❌: property city does not exist
        }}
      >
        Put me!
      </button>
```
```tsx
      <label>Join our mailing list</label>
      <YesNoInput<Client> control={control} name="isNewsletterAllowedToday" /> // ❌: property isNewsletterAllowedToday does not exist
      <ErrorMessage>{errors.isNewsletterAllowedToday?.message}</ErrorMessage>
```

# Watch and get values
There is a hook to watch values. We can provide name (or names) of values which we want to watch.
This will not cause rerendering when different fields were changed. 
There is also on option to watch all values - in that scenario `name` should stay `undefined`.
```typescript
  const isNewsletterAllowed = useWatch({
    control,
    name: "isNewsletterAllowed",
    defaultValue: false,
  });
```

We can also get values using helper `getValues`. This allows getting values on demand.

That both makes a lot of features possible like conditionally rendering:
```tsx
      {isNewsletterAllowed && (
        <>
          <label>Email</label>
          <input {...register("email")} maxLength={50} />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </>
      )}
```

# Set values
It's easily possible with helper `setValues`.
```typescript
setValue("advisor", "james");
```
It's possible to additionally configure behavior with setting dirty flag or decide if validation should be fired. 

# Validation
Native support for [Yup](https://github.com/jquense/yup) schema validation (same as for [Formik](https://formik.org/)).
```typescript
export const clientSchema: SchemaOf<Client> = yup.object().shape({
  firstName: yup.string().max(50).required(),
  lastName: yup.string().max(50).required(),
  gender: yup.mixed().oneOf(["male", "female"]).required(),
  advisor: yup.mixed().oneOf(Object.values(Advisor)).notRequired(),
  isNewsletterAllowed: yup.boolean().required(),
  email: yup.string().when("isNewsletterAllowed", {
    is: true,
    then: yup.string().email().required(),
    otherwise: yup.string().notRequired(),
  }),
});
```
```tsx
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Client>({ resolver: yupResolver(clientSchema), mode: "onBlur" });
```

There is also build in mechanism for simple validation, support for manually setting  errors and triggering validations. 

# Controller
React Hook Form works with uncontrolled components but also has support to controlled ones.
This makes it compatible with UI libraries.

Additionally `Controller` support functions like: `transform` and `parse`.
That's important because this allows to use proper types for data, despite the fact that html inputs operate on `strings`.

Example of component with `input` which operate on `boolean` type:
```tsx
interface YesNoInputProps<FormValues> {
  name: FieldPath<FormValues>;
  control: Control<FormValues>;
}

export const YesNoInput = <FormValues,>({
  control,
  name,
}: YesNoInputProps<FormValues>) => (
  <Controller
    defaultValue={false}
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
```


# Conclusion