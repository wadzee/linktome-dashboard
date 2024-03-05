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
import { Flex } from "src/components/Flex/Flex";
import { InviteUserForm, inviteUser } from "src/services/admin/inviteUser";

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
  onCancel: () => void;
}

export function ProfileAdminCreation({ next, onCancel }: ProfileCreationProps) {
  const data = useContext(userContext);
  const [file, setFile] = useState<File>();
  const [showProfile, setShowProfile] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, defaultValues },
    setValue,
    watch,
  } = useForm<InviteUserForm>({
    defaultValues: {
      uniqueUrl: "linkto.me/politician/",
    },
  });

  const onSubmit = async (input: InviteUserForm) => {
    try {
      const s3SignedUrl = await inviteUser({
        idToken: data?.idToken!,
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

  const firstNameField = watch("firstName")?.toLowerCase();
  const lastNameField = watch("lastName")?.toLowerCase();

  return (
    <>
      <Flex>
        <h2>Invite a User</h2>
      </Flex>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-8 sm:max-w-[80%] mx-auto"
      >
        <List gap="gap-4">
          <List gap="gap-4">
            <Text>Name</Text>
            <TextField<InviteUserForm>
              label="First Name"
              name="firstName"
              register={register}
              errors={errors.firstName}
            />
            <TextField<InviteUserForm>
              label="Last Name"
              name="lastName"
              register={register}
              errors={errors.lastName}
            />
          </List>
          <List gap="gap-4">
            <Text>Email</Text>
            <TextField<InviteUserForm>
              label="Email"
              name="email"
              type="email"
              register={register}
              errors={errors.email}
            />
          </List>
          <List gap="gap-4">
            <Text>Unique URL</Text>
            <TextField<InviteUserForm>
              name="uniqueUrl"
              value={defaultValues?.uniqueUrl! + firstNameField + lastNameField}
              register={register}
              disabled
              errors={errors.lastName}
            />
          </List>
          <List gap="gap-4">
            <Flex justifyContent="justify-between">
              <div>
                <h3>
                  Profile <span className="text-xl">(optional)</span>
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowProfile(!showProfile)}
              >
                {showProfile ? "Hide" : "Show"}
              </button>
            </Flex>
            <Text className="text-light-navy">
              Let the politician to complete their profile details after
              accepting the invitation, or fill them now for them.
            </Text>
            {showProfile && (
              <>
                <ImageInput
                  label="Profile image"
                  className="w-[150px] h-[150px]"
                  onImageUploaded={handleImageUpload}
                  customFilename="image"
                />
                <Text>Political Party</Text>
                <SelectField<InviteUserForm>
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
                <SelectField<InviteUserForm>
                  name="party"
                  register={register}
                  options={Party["Malaysia"]}
                />
                <TextField<InviteUserForm>
                  label="Role"
                  name="role"
                  register={register}
                  errors={errors.lastName}
                />
                <List gap="gap-4">
                  <TextAreaField<InviteUserForm>
                    label="About"
                    name="about"
                    register={register}
                    rows={5}
                    placeholder="Tell your audience a bit about yourself..."
                    className="resize-none bg-transparent"
                  />
                </List>
              </>
            )}
          </List>
          <Flex className="my-6">
            <Button
              type="button"
              variant="secondary"
              className="mb-4 sm:w-fit"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button type="submit" className="mb-4 sm:w-fit">
              Invite now
            </Button>
          </Flex>
        </List>
      </form>
    </>
  );
}
