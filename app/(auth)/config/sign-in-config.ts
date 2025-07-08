import { FormConfig } from "@/app/lib/Form/Formtypes/Formtypes";

export type GridFormValues = {
  password: string;
  email : string
};

export const gridFormConfig: FormConfig<GridFormValues> = {
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
      placeholder:'Enter your email',
      type: "email",
      validation: { required: "Email is required" },
      colSpan: 12,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      validation: { required: "Password is required" },
      colSpan: 12,
    },
  ],
};
