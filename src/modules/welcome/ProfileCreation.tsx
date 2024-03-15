import {
  UserProfileInputForm,
  updateUserProfile,
} from "src/services/user/updateUserProfile";

import { Button } from "src/components/Button/Button";
import { List } from "src/components/List/List";
import { SelectField } from "src/components/Inputs/SelectField";
import { Text } from "src/components/Text/Text";
import { TextField } from "src/components/Inputs/TextField";
import { useForm } from "react-hook-form";
import { TextAreaField } from "src/components/Inputs/TextAreaField";
import { ImageInput } from "src/components/Inputs/ImageInput";
import { useContext, useState } from "react";
import { updateProfileImage } from "src/services/user/uploadProfileImage";
import { userContext } from "src/context/UserProvider";

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
  title?: string;
  description?: string;
  next: () => void;
}

export function ProfileCreation({
  title = "Complete your profile",
  description = `Fill out the below details to finalise your profile. You can update
  the details any time from your ‘Profile’ page.`,
  next,
}: ProfileCreationProps) {
  const data = useContext(userContext);
  const [file, setFile] = useState<File>();
  const {
    register,
    handleSubmit,
    formState: { errors, defaultValues, isSubmitting },
    setValue,
    watch,
  } = useForm<UserProfileInputForm>({
    defaultValues: {
      uniqueUrl: "https://linktome.xyz/politician/",
    },
  });

  const firstNameField = watch("firstName")?.toLowerCase();
  const lastNameField = watch("lastName")?.toLowerCase();

  const onSubmit = async (input: UserProfileInputForm) => {
    try {
      const s3SignedUrl = await updateUserProfile({
        idToken: data?.idToken!,
        userId: data?.userId!,
        email: data?.email!,
        firstSetup: true,
        ...input,
      });

      if (s3SignedUrl && file) {
        await updateProfileImage({ preSignedUrl: s3SignedUrl, image: file });
      }

      next();
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleImageUpload = (image: File) => {
    setValue("image", image.name);
    setFile(image);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
      <List gap="gap-4">
        <h3>{title}</h3>
        <Text className="text-light-navy">{description}</Text>
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
            value={defaultValues?.uniqueUrl! + firstNameField + lastNameField}
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
        <List gap="gap-4">
          <TextAreaField<UserProfileInputForm>
            label="About"
            name="about"
            register={register}
            rows={5}
            placeholder="Tell your audience a bit about yourself..."
            className="resize-none bg-transparent"
          />
        </List>
        <ImageInput
          label="Profile image"
          className="w-[150px] h-[150px]"
          onImageUploaded={handleImageUpload}
          customFilename="image"
        />
        <Button
          type="submit"
          className="mb-4 sm:w-fit"
          isLoading={isSubmitting}
        >
          Done
        </Button>
      </List>
    </form>
  );
}
