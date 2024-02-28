import { List } from "src/components/List/List";
import { SelectField } from "src/components/Inputs/SelectField";
import { Text } from "src/components/Text/Text";
import { TextField } from "src/components/Inputs/TextField";
import { UserProfileInputForm } from "src/services/user/updateUserProfile";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

const Party = {
  Malaysia: [
    {
      label: "Parti Keadilan Rakyat",
      value: "PKR",
    },
    {
      label: "Barisan Nasional",
      value: "BN",
    },
    {
      label: "Democratic Action Party",
      value: "DAP",
    },
  ],
  Australia: [
    {
      label: "Labor Party",
      value: "Labor Party",
    },
    {
      label: "Liberal Party",
      value: "Liberal Party",
    },
    {
      label: "Australian Greens",
      value: "Australian Greens",
    },
  ],
};

interface ProfileCreationProps {
  next: () => void;
}

export function ProfileCreation({ next }: ProfileCreationProps) {
  const onDrop = useCallback(() => {}, []);

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfileInputForm>({
    defaultValues: {
      uniqueUrl: "https://staging.linktome.xyz/politician",
    },
  });

  const onSubmit = async (input: UserProfileInputForm) => {
    // try {
    //   await updateUserProfile({
    //     newPassword: input.newPassword,
    //     firstTime: true,
    //     username,
    //   });
    //   next();
    // } catch (err) {
    //   console.log("err", err);
    // }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <List>
        <h3>Complete your profile</h3>
        <Text className="text-light-navy">
          Fill out the below details to finalise your profile. You can update
          the details any time from your ‘Profile’ page.
        </Text>
        <List gap="gap-4">
          <Text>Name</Text>
          <TextField<UserProfileInputForm>
            label="First Name"
            name="firstName"
            register={register}
            errors={errors.firstName}
          />
          <TextField<UserProfileInputForm>
            label="Last Name"
            name="lastName"
            register={register}
            errors={errors.lastName}
          />
        </List>
        <List gap="gap-4">
          <Text>Unique URL</Text>
          <TextField<UserProfileInputForm>
            name="uniqueUrl"
            register={register}
            disabled
            errors={errors.lastName}
          />
        </List>
        <List gap="gap-4">
          <Text>Political Party</Text>
          <SelectField<UserProfileInputForm>
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
          <SelectField<UserProfileInputForm>
            name="party"
            register={register}
            options={Party["Malaysia"]}
          />
          <TextField<UserProfileInputForm>
            label="Role"
            name="role"
            register={register}
            errors={errors.lastName}
          />
        </List>
        <List>
          <Text>About</Text>
          <textarea
            name="About"
            placeholder="Tell your audience a bit about yourself..."
            className="textfield resize-none !bg-transparent"
            rows={5}
          />
        </List>
        <List>
          <Text>Profile Image</Text>
          <div
            {...getRootProps()}
            className="h-[200px] w-full sm:w-[200px] border border-dotted rounded-2xl"
          >
            <input {...getInputProps()} />
            <Text>+</Text>
          </div>
        </List>
      </List>
    </form>
  );
}
