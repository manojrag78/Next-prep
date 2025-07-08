import { useState } from "react";
import { FieldErrors, FieldValues, Path, PathValue } from "react-hook-form";
import { castValueByType, getFieldError, sizeClasses, variantClasses } from "../FormHelpers/FormHelper";
import { FormFieldProps, FormSize, FormVariant } from "../Formtypes/Formtypes";
import { ChevronDownIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import '../../../globals.css';

export function RenderInput<T extends FieldValues>(
  field: FormFieldProps<T>,
  value: PathValue<T, Path<T>>,
  onChange: (value: PathValue<T, Path<T>>) => void,
  disabled: boolean,
  size: FormSize,
  variant: FormVariant,
  errors: FieldErrors<T>
) {
  const [showPassword, setShowPassword] = useState(false);
  
  const fieldSize = field.size || size;
  const fieldVariant = field.variant || variant;
  const fieldError = getFieldError(errors, field.name as Path<T>);

  const baseClasses = `
    w-full border rounded-md transition-colors duration-200 outline-none
    ${sizeClasses[fieldSize]}
    ${variantClasses[fieldVariant]}
    ${fieldError ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}
    ${field.disabled || disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : ""}
    ${field.readonly ? "bg-gray-50 cursor-default" : ""}
  `.trim().replace(/\s+/g, " ");

  const inputProps = {
    className: baseClasses,
    disabled: field.disabled || disabled,
    readOnly: field.readonly,
    placeholder: field.placeholder,
  };

  switch (field.type) {
    case "text":
    case "email":
    case "number":
    case "date":
    case "datetime-local":
    case "tel":
    case "url":
    case "search":
      return (
        <div className="relative">
          {field.prefix && (
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
              {field.prefix}
            </span>
          )}
          {field.icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              {field.icon}
            </div>
          )}
          <input
            {...inputProps}
            type={field.type}
            className={`${baseClasses} ${field.icon ? "pl-10" : ""} ${field.prefix ? "pl-8" : ""} ${field.suffix ? "pr-8" : ""}`}
            step={field.step}
            value={value ?? ""}
            onChange={(e) => onChange(castValueByType<T>(field.type, e.target.value))}
          />
          {field.suffix && (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
              {field.suffix}
            </span>
          )}
        </div>
      );

    case "password":
      return (
        <div className="relative">
          {field.prefix && (
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
              {field.prefix}
            </span>
          )}
          {field.icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              {field.icon}
            </div>
          )}
          <input
            {...inputProps}
            type={showPassword ? "text" : "password"}
            className={`${baseClasses} ${field.icon ? "pl-10" : ""} ${field.prefix ? "pl-8" : ""} pr-10`}
            value={value ?? ""}
            onChange={(e) => onChange(castValueByType<T>(field.type, e.target.value))}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOffIcon className="h-5 w-5 cursor-pointer" />
            ) : (
              <EyeIcon className="h-5 w-5 cursor-pointer" />
            )}
          </button>
          {field.suffix && (
            <span className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
              {field.suffix}
            </span>
          )}
        </div>
      );

    case "textarea":
      return (
        <textarea
          {...inputProps}
          className={`${baseClasses} resize-vertical`}
          rows={field.rows || 4}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value as PathValue<T, Path<T>>)}
        />
      );

    case "select":
      return (
        <div className="relative">
          <select
            {...inputProps}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value as PathValue<T, Path<T>>)}
          >
            <option value="">{field.placeholder || "Select an option"}</option>
            {field.options?.map((option) => (
              <option key={String(option.value)} value={String(option.value)} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      );

    case "multiselect":
      return (
        <div className="relative">
          <select
            {...inputProps}
            multiple
            className={`${baseClasses} pr-10`}
            value={Array.isArray(value) ? value : []}
            onChange={(e) => {
              const selectedValues = Array.from(e.target.selectedOptions, (o) => o.value);
              onChange(selectedValues as PathValue<T, Path<T>>);
            }}
          >
            {field.options?.map((option) => (
              <option key={String(option.value)} value={String(option.value)} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      );

    case "checkbox":
      return (
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            className={`
              h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded
              ${fieldError ? "border-red-500" : ""}
              ${field.disabled || disabled ? "cursor-not-allowed opacity-60" : ""}
            `}
            disabled={field.disabled || disabled}
            checked={Boolean(value)}
            onChange={(e) => onChange(castValueByType<T>("checkbox", e.target.checked))}
          />
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">{field.label}</label>
            {field.helpText && <p className="mt-1 text-sm text-gray-500">{field.helpText}</p>}
          </div>
        </div>
      );

    case "radio":
      return (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">{field.label}</label>
          <div className="space-y-2">
            {field.options?.map((option) => (
              <div key={String(option.value)} className="flex items-start space-x-3">
                <input
                  type="radio"
                  className={`
                    h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300
                    ${fieldError ? "border-red-500" : ""}
                    ${field.disabled || disabled || option.disabled ? "cursor-not-allowed opacity-60" : ""}
                  `}
                  disabled={field.disabled || disabled || option.disabled}
                  checked={value === option.value}
                  onChange={() => onChange(option.value as PathValue<T, Path<T>>)}
                />
                <div className="flex-1">
                  <label className="block text-sm text-gray-900 cursor-pointer">{option.label}</label>
                  {option.description && <p className="text-xs text-gray-500">{option.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "file":
      return (
        <input
          type="file"
          className={`${baseClasses} file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
          disabled={field.disabled || disabled}
          accept={field.accept}
          multiple={field.multiple}
          onChange={(e) => {
            const files = e.target.files;
            onChange(
              field.multiple
                ? (Array.from(files || []) as PathValue<T, Path<T>>)
                : ((files?.[0] || null) as PathValue<T, Path<T>>)
            );
          }}
        />
      );

    case "range":
      return (
        <div className="space-y-2">
          <input
            type="range"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            disabled={field.disabled || disabled}
            value={value ?? 0}
            min={field.validation?.min}
            max={field.validation?.max}
            step={field.step}
            onChange={(e) => onChange(castValueByType<T>("range", e.target.value))}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{field.validation?.min || 0}</span>
            <span className="font-medium">{value ?? 0}</span>
            <span>{field.validation?.max || 100}</span>
          </div>
        </div>
      );

    case "color":
      return (
        <input
          type="color"
          className="h-10 w-20 border border-gray-300 rounded-md cursor-pointer"
          disabled={field.disabled || disabled}
          value={(value as string) ?? "#000000"}
          onChange={(e) => onChange(e.target.value as PathValue<T, Path<T>>)}
        />
      );

    case "custom":
    default:
      return null;
  }
}

export default RenderInput;