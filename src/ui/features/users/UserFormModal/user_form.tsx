import { Button } from '@heroui/react';
import { useState } from 'react';
import type { UserFormValues } from '../../../../app/modules/users/schemas/dto_validations/user_form.schema';

type Props = {
  defaultValues: UserFormValues;
  submitLabel: string;
  isPending: boolean;
  onSubmit: (values: UserFormValues) => void;
};

const UserForm = ({ defaultValues, submitLabel, isPending, onSubmit }: Props) => {
  const [values, setValues] = useState<UserFormValues>(defaultValues);

  const setField = (key: keyof UserFormValues) => (raw: string) =>
    setValues((prev) => ({ ...prev, [key]: key === 'age' ? Number(raw) : raw }));

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(values);
      }}
    >
      {/* Swap these native inputs for HeroUI <TextField> / <NumberField>. */}
      <label className="flex flex-col gap-1 text-sm">
        First name
        <input
          className="rounded border px-2 py-1"
          value={values.firstName}
          onChange={(e) => setField('firstName')(e.target.value)}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Last name
        <input
          className="rounded border px-2 py-1"
          value={values.lastName}
          onChange={(e) => setField('lastName')(e.target.value)}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Age
        <input
          type="number"
          className="rounded border px-2 py-1"
          value={values.age}
          onChange={(e) => setField('age')(e.target.value)}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Email
        <input
          type="email"
          className="rounded border px-2 py-1"
          value={values.email}
          onChange={(e) => setField('email')(e.target.value)}
        />
      </label>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" slot="close" size="sm" variant="ghost">
          Cancel
        </Button>
        <Button type="submit" size="sm" variant="primary" isPending={isPending}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
