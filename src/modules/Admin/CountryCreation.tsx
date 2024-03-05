"use client";
import { useForm } from "react-hook-form";
import { Button } from "src/components/Button/Button";
import { SelectField } from "src/components/Inputs/SelectField";
import { TextField } from "src/components/Inputs/TextField";
import {
  CountryInputForm,
  updateCountry,
} from "src/services/admin/updateCountry";
import { PartyInputForm, updateParties } from "src/services/admin/updateParty";

interface CountryCreationProps {
  idToken: string;
  next: (back: boolean) => void;
}

export function CountryCreation({ idToken, next }: CountryCreationProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CountryInputForm>({
    defaultValues: {
      active: true,
    },
  });

  const onSubmit = async (input: CountryInputForm) => {
    try {
      await updateCountry({
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
      <SelectField<CountryInputForm>
        name="id"
        register={register}
        defaultValue="Malaysia"
        options={[
          { label: "New Zealand", value: "New Zealand" },
          { label: "Australia", value: "Australia" },
          { label: "Singapore", value: "Singapore" },
          { label: "New Zealand", value: "NewZealand" },
        ]}
      />
      <Button type="submit">Save</Button>
    </form>
  );
}
