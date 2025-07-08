import { FormFieldProps, FormLayout, FormSize, FormVariant } from "../Formtypes/Formtypes";
import {
  FieldValues,
  FieldErrors,
  Path,
  FieldError,
  get,
  PathValue,
  RegisterOptions,
} from "react-hook-form";
export const sizeClasses: Record<FormSize, string> = {
  sm: "text-sm px-2 py-1",
  md: "text-base px-3 py-2",
  lg: "text-lg px-4 py-3",
};

export const variantClasses: Record<FormVariant, string> = {
  default:
    "border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1",
  outlined:
    "border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1",
  filled:
    "border-transparent bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-blue-500 focus:ring-1",
  minimal:
    "border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-500 focus:ring-0",
};

export function getFieldError<T extends FieldValues>(
  errors: FieldErrors<T>,
  name: Path<T>
): FieldError | undefined {
  return get(errors, name) as FieldError | undefined;
}

export function getGridColsClass(cols: number): string {
  const colsMap: Record<number, string> = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
    6: "md:grid-cols-6",
    12: "md:grid-cols-12",
  };
  return colsMap[cols] || "md:grid-cols-1";
}

export function getColSpanClass(span: number): string {
  const spanMap: Record<number, string> = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
    7: "col-span-7",
    8: "col-span-8",
    9: "col-span-9",
    10: "col-span-10",
    11: "col-span-11",
    12: "col-span-12",
  };
  return spanMap[span] || "";
}

export const getLayoutClasses = (layout: FormLayout): string => {
  switch (layout) {
    case "horizontal":
      return "flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4 md:items-center";
    case "inline":
      return "flex flex-wrap items-center gap-3";
    case "grid":
      return "grid grid-cols-1 md:grid-cols-2 gap-4";
    default:
      return "flex flex-col space-y-4";
  }
};

export function castValueByType<T extends FieldValues>(
  type: string,
  rawValue: unknown
): PathValue<T, Path<T>> {
  switch (type) {
    case "number":
    case "range":
      return Number(rawValue) as PathValue<T, Path<T>>;
    case "checkbox":
      return Boolean(rawValue) as PathValue<T, Path<T>>;
    default:
      return rawValue as PathValue<T, Path<T>>;
  }
}

export const getValidationRules = <T extends FieldValues>(field: FormFieldProps<T>): RegisterOptions => {
    const rules: RegisterOptions = {};
    
    if (field.validation) {
      if (field.validation.required) {
        rules.required = typeof field.validation.required === 'string' 
          ? field.validation.required 
          : `${field.label} is required`;
      }
      
      if (field.validation.pattern) {
        rules.pattern = {
          value: new RegExp(field.validation.pattern.value) ,
          message: `Invalid ${field.label} format`,
        };
      }
      
      if (field.validation.min !== undefined) {
        rules.min = {
          value: field.validation.min,
          message: `${field.label} must be at least ${field.validation.min}`,
        };
      }
      
      if (field.validation.max !== undefined) {
        rules.max = {
          value: field.validation.max,
          message: `${field.label} must be at most ${field.validation.max}`,
        };
      }
      
      if (field.validation.minLength !== undefined) {
        rules.minLength = {
          value: field.validation.minLength,
          message: `${field.label} must be at least ${field.validation.minLength} characters`,
        };
      }
      
      if (field.validation.maxLength !== undefined) {
        rules.maxLength = {
          value: field.validation.maxLength,
          message: `${field.label} must be at most ${field.validation.maxLength} characters`,
        };
      }
      
      if (field.validation.validate) {
        rules.validate = field.validation.validate;
      }
    }

    return rules;
  };