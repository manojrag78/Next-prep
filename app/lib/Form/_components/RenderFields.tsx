import { Controller, FieldValues } from "react-hook-form";
import { RenderFieldsProps } from "../Formtypes/Formtypes";
import { getColSpanClass, getFieldError, getGridColsClass, getLayoutClasses, getValidationRules } from "../FormHelpers/FormHelper";
import renderInput from "./RenderInput";


export const renderFields = <T extends FieldValues>({
  fields,
  control,
  errors,
  showErrors = true,
  gridCols,
  size,
  layout,
  variant
}: RenderFieldsProps<T>) => (
  <div
    className={`grid grid-cols-1 ${
      gridCols ? getGridColsClass(gridCols) : ""
    } gap-6`}
  >
    {fields.map((field) => (
      <div
        key={field.name}
        className={`${getLayoutClasses(layout)} ${
          field.colSpan ? getColSpanClass(field.colSpan) : ""
        } ${field.className || ""}`}
        style={field.style}
      >
        {field.type !== "checkbox" && field.type !== "radio" && (
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {field.label}
            {field.validation?.required && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </label>
        )}

        <Controller
          name={field.name}
          control={control}
          rules={getValidationRules(field) as never}
          render={({ field: { onChange, value }, formState }) => (
            <>
              {field.type === "custom" && field.render ? (
                field.render({
                  onChange,
                  value,
                  errors,
                  control,
                  fieldState: formState,
                  field: { ...field },
                })
              ) : (
                renderInput(
                  field,
                  value,
                  onChange,
                  field.disabled ?? false,
                  size,
                  variant,
                  errors
                )
              )}
            </>
          )}
        />

        {showErrors && getFieldError(errors, field.name) && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <svg
              className="w-4 h-4 mr-1 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {getFieldError(errors, field.name)?.message}
          </p>
        )}

        {field.helpText && field.type !== "checkbox" && (
          <p className="mt-2 text-sm text-gray-500">{field.helpText}</p>
        )}
      </div>
    ))}
  </div>
);
