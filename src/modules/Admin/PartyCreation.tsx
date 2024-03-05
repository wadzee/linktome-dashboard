"use client";
import { useForm } from "react-hook-form";
import { Button } from "src/components/Button/Button";
import { SelectField } from "src/components/Inputs/SelectField";
import { TextField } from "src/components/Inputs/TextField";
import { PartyInputForm, updateParties } from "src/services/admin/updateParty";

interface PartyCreationProps {
  idToken: string;
  next: (back: boolean) => void;
}

export function PartyCreation({ idToken, next }: PartyCreationProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PartyInputForm>({
    defaultValues: {
      active: true,
    },
  });

  const onSubmit = async (input: PartyInputForm) => {
    try {
      await updateParties({
        idToken: idToken,
        ...input,
      });

      next(false);
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <SelectField<PartyInputForm>
        name="country"
        register={register}
        defaultValue="Malaysia"
        options={[
          {
            label: "Malaysia",
            value: "Malaysia",
          },
          { label: "New Zealand", value: "New Zealand" },
          { label: "Australia", value: "Australia" },
        ]}
      />
      <TextField<PartyInputForm>
        label="Name of the party"
        name="label"
        register={register}
        errors={errors.label}
      />
      <Button type="submit">Save</Button>
    </form>
  );
}
