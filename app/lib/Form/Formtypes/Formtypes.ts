import { Control, FieldErrors, FieldValues, Path, SubmitErrorHandler, SubmitHandler, UseFormReturn } from "react-hook-form";

export type FormFieldType = 
  | 'text' 
  | 'email' 
  | 'password' 
  | 'number' 
  | 'date' 
  | 'datetime-local'
  | 'tel' 
  | 'url'
  | 'search'
  | 'textarea' 
  | 'select' 
  | 'multiselect'
  | 'checkbox' 
  | 'radio' 
  | 'file'
  | 'range'
  | 'color'
  | 'custom';

export type FormLayout = 'vertical' | 'horizontal' | 'inline' | 'grid';
export type FormSize = 'sm' | 'md' | 'lg';
export type FormVariant = 'default' | 'outlined' | 'filled' | 'minimal';

export interface FormFieldOption {
  value: string | number | boolean;
  label: string;
  disabled?: boolean;
  description?: string;
}

export interface FormFieldValidation<T = FieldValues> {
  required?: boolean | string;
  pattern?: { value: RegExp; message: string };
  min?: number | string;
  max?: number | string;
  minLength?: number;
  maxLength?: number;
  validate?: (value: unknown, formValues: T) => boolean | string | Promise<boolean | string>;
}

export interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  type: FormFieldType;
  label: string;
  placeholder?: string;
  validation?: FormFieldValidation;
  options?: FormFieldOption[];
  rows?: number;
  disabled?: boolean;
  readonly?: boolean;
  helpText?: string;
  className?: string;
  style?: React.CSSProperties;
  colSpan?: number;
  size?: FormSize;
  variant?: FormVariant;
  icon?: React.ReactNode;
  prefix?: string;
  suffix?: string;
  step?: number;
  accept?: string;
  multiple?: boolean;
  render?: (props: {
    onChange: (value: unknown) => void;
    value: unknown;
    errors: FieldErrors<T>;
    control: Control<T>;
    fieldState: UseFormReturn<T>['formState'];
    field: Omit<FormFieldProps<T>, 'render'>;
  }) => React.ReactNode;
}

export interface FormSection<T extends FieldValues> {
  title?: string;
  description?: string;
  fields: FormFieldProps<T>[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export interface FormConfig<T extends FieldValues> {
  title?: string;
  description?: string;
  sections?: FormSection<T>[];
  fields?: FormFieldProps<T>[];
  gridCols?: 1 | 2 | 3 | 4 | 6 | 12;
  enableReset?: boolean;
  resetButtonText?: string;
  showProgress?: boolean;
  saveAsDraft?: boolean;
  autoSave?: boolean;
  autoSaveInterval?: number;
  fullWidthButtons?: boolean;
}

export interface DynamicFormProps<T extends FieldValues> {
  formConfig: FormConfig<T>;
  onSubmit: SubmitHandler<T>;
  onError?: SubmitErrorHandler<T>;
  onDraftSave?: (data: Partial<T>) => void;
  submitButtonText?: string;
  defaultValues?: Partial<T>;
  layout?: FormLayout;
  size?: FormSize;
  variant?: FormVariant;
  className?: string;
  showErrors?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

export interface RenderFieldsProps<T extends FieldValues> {
  fields: FormFieldProps<T>[];
  control: Control<T>;
  errors: FieldErrors<T>;
  showErrors?: boolean;
  gridCols?: number;
  size: FormSize;
  variant: FormVariant;
  layout: FormLayout;
}

