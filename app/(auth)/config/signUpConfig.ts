import { FormConfig } from "@/app/lib/Form/Formtypes/Formtypes";

export type SignupFormValues = {
  firstName: string;
  lastName: string;  
  userName: string;
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
      name: "firstName",
      label: "First Name",
      placeholder:'Enter your First name',
      type: "text",
      validation: { required: "First name is required" },
      colSpan: 6,
    },
    {
      name: "lastName",
      label: "Last Name",
      placeholder:'Enter your Last name',
      type: "text",
      colSpan: 6,
    },
    {
      name: "email",
      label: "Email",
      placeholder:'Enter your email name',
      type: "email",
      validation: { required: "Email is required" },
      colSpan: 12,
    },
    {
      name: "userName",
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
