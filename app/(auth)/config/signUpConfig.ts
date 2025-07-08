import { FormConfig } from "@/app/lib/Form/Formtypes/Formtypes";

export type SignupFormValues = { 
  username: string;
  password: string;
  email: string;
  confirmPassword?: string; 
};

export const signUpFormConfig: FormConfig<SignupFormValues> = {
  title: "",
  description: "",
  showProgress: false,
  enableReset: false,
  saveAsDraft: false,
  autoSave: false,
  fullWidthButtons: true,
  autoSaveInterval: 5000,
  gridCols: 12, 
  fields: [
    {
      name: "email",
      label: "Email",
      placeholder:'Enter your email name',
      type: "email",
      validation: { required: "Email is required" },
      colSpan: 12,
    },
    {
      name: "username",
      label: "User Name",
      placeholder:'Enter your first name',
      type: "text",
      validation: { required: "User Name is required" },
      colSpan: 12,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      validation: { required: "Password is required" },
      colSpan: 12,
    },
    {
        name: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        validation: {
            required: "Confirm Password is required",
            validate: (value, formValues) => 
            value === formValues.password || "Passwords do not match"
        },
        colSpan: 12,
    }
  ],
};
