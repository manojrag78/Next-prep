import { FormConfig } from "@/app/lib/Form/Formtypes/Formtypes";

export type GridFormValues = {
  userName: string;
  password: string;
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
  ],
};
