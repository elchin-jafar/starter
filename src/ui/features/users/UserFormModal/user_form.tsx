import {
  UserFormSchema,
  type UserFormValues,
} from "@/app/modules/users/schemas/dto_validations/user_form.schema";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  NumberField,
  TextField,
} from "@heroui/react";
import { type SyntheticEvent, useState } from "react";

type Props = {
  defaultValues: UserFormValues;
  submitLabel: string;
  isPending: boolean;
  onSubmit: (values: UserFormValues) => void;
};

type FieldErrors = Partial<Record<keyof UserFormValues, string>>;

const UserForm = ({
  defaultValues,
  submitLabel,
  isPending,
  onSubmit,
}: Props) => {
  const [values, setValues] = useState<UserFormValues>(defaultValues);
  const [errors, setErrors] = useState<FieldErrors>({});

  const setField =
    <K extends keyof UserFormValues>(key: K) =>
    (value: UserFormValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
      // Clear the field error as soon as the user edits it.
      setErrors((prev) => {
        if (!prev[key]) return prev;
        const next = { ...prev };
        delete next[key];
        return next;
      });
    };

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = UserFormSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const next: FieldErrors = {};
      (Object.keys(fieldErrors) as Array<keyof UserFormValues>).forEach(
        (key) => {
          const message = fieldErrors[key]?.[0];
          if (message) next[key] = message;
        },
      );
      setErrors(next);
      return;
    }

    setErrors({});
    onSubmit(result.data);
  };

  return (
    <Form
      className="flex flex-col gap-3"
      validationBehavior="aria"
      validationErrors={errors}
      onSubmit={handleSubmit}
    >
      <TextField
        name="firstName"
        value={values.firstName}
        onChange={setField("firstName")}
        isRequired
      >
        <Label>First name</Label>
        <Input />
        <FieldError />
      </TextField>

      <TextField
        name="lastName"
        value={values.lastName}
        onChange={setField("lastName")}
        isRequired
      >
        <Label>Last name</Label>
        <Input />
        <FieldError />
      </TextField>

      <NumberField
        name="age"
        value={values.age}
        onChange={setField("age")}
        minValue={0}
        maxValue={120}
        isRequired
      >
        <Label>Age</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <FieldError />
      </NumberField>

      <TextField
        name="email"
        type="email"
        value={values.email}
        onChange={setField("email")}
        isRequired
      >
        <Label>Email</Label>
        <Input />
        <FieldError />
      </TextField>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" slot="close" size="sm" variant="ghost">
          Cancel
        </Button>
        <Button type="submit" size="sm" variant="primary" isPending={isPending}>
          {submitLabel}
        </Button>
      </div>
    </Form>
  );
};

export default UserForm;
