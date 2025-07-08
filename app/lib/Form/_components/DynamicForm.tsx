"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  DefaultValues,
  FieldValues,
  get,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { DynamicFormProps } from "../Formtypes/Formtypes";
import { renderFields } from "./RenderFields";

export function DynamicForm<T extends FieldValues>({
  formConfig,
  onSubmit,
  onError,
  onDraftSave,
  submitButtonText = "Submit",
  defaultValues,
  layout = "vertical",
  size = "md",
  variant = "default",
  className = "",
  showErrors = true,
  loading = false,
  disabled = false,
}: DynamicFormProps<T>) {
  const [collapsedSections, setCollapsedSections] = useState<Set<number>>(
    new Set()
  );
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
    reset,
    watch,
  } = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>,
    mode: "onChange",
  });

  const watchedValues = watch();

  useEffect(() => {
    if (!formConfig.autoSave || !onDraftSave || !isDirty) return;

    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    autoSaveTimeoutRef.current = setTimeout(() => {
      onDraftSave(watchedValues);
      setIsDraftSaved(true);
      setTimeout(() => setIsDraftSaved(false), 3000);
    }, formConfig.autoSaveInterval || 30000);

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
        autoSaveTimeoutRef.current = null;
      }
    };
  }, [
    watchedValues,
    isDirty,
    formConfig.autoSave,
    formConfig.autoSaveInterval,
    onDraftSave,
  ]);

  const toggleSection = (index: number) => {
    const newCollapsed = new Set(collapsedSections);
    if (newCollapsed.has(index)) {
      newCollapsed.delete(index);
    } else {
      newCollapsed.add(index);
    }
    setCollapsedSections(newCollapsed);
  };

  const handleFormSubmit: SubmitHandler<T> = (data) => {
    setIsDraftSaved(false);
    onSubmit(data);
  };

  const handleFormError: SubmitErrorHandler<T> = (formErrors) => {
    if (onError) onError(formErrors);
  };

  const allFields = formConfig.sections
    ? formConfig.sections.flatMap((section) => section.fields)
    : formConfig.fields || [];

  const completedFields = allFields.filter((field) => {
    const value = get(watchedValues, field.name);
    return value !== undefined && value !== "" && value !== null;
  }).length;

  const progress =
    allFields.length > 0 ? (completedFields / allFields.length) * 100 : 0;

  const buttonContainerClass = formConfig.fullWidthButtons
    ? "space-y-4"
    : "flex flex-wrap gap-4";

  const fullWidthClass = formConfig.fullWidthButtons ? "w-full" : "";

  return (
    <div className={`${className} space-y-6`}>
      <form
        onSubmit={handleSubmit(handleFormSubmit, handleFormError)}
        className="space-y-6"
      >
        {/* Header */}
        <div className="space-y-2">
          {formConfig.title && (
            <h2 className="text-2xl font-bold">{formConfig.title}</h2>
          )}
          {formConfig.description && (
            <p className="text-sm text-gray-600">{formConfig.description}</p>
          )}
          {formConfig.showProgress && (
            <div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round(progress)}% complete
              </p>
            </div>
          )}
          {isDraftSaved && (
            <div className="flex items-center text-sm text-green-600">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Draft saved
            </div>
          )}
        </div>

        {/* Sections or Fields */}
        {formConfig.sections ? (
          <div className="space-y-8">
            {formConfig.sections.map((section, index) => (
              <div key={index} className="bg-white border rounded-lg p-6">
                {section.title && (
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{section.title}</h3>
                    {section.collapsible && (
                      <button
                        type="button"
                        onClick={() => toggleSection(index)}
                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                      >
                        <svg
                          className={`w-5 h-5 transform transition-transform ${
                            collapsedSections.has(index) ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                )}
                {section.description && (
                  <p className="text-sm text-gray-600 mb-4">
                    {section.description}
                  </p>
                )}
                {!section.collapsible || !collapsedSections.has(index)
                  ? renderFields<T>({
                      fields: section.fields,
                      control,
                      errors,
                      showErrors,
                      gridCols: formConfig.gridCols,
                      size,
                      layout,
                      variant,
                    })
                  : null}
              </div>
            ))}
          </div>
        ) : (
          renderFields<T>({
            fields: formConfig.fields || [],
            control,
            errors,
            showErrors,
            gridCols: formConfig.gridCols,
            size,
            layout,
            variant,
          })
        )}

        {/* Form Actions */}
        <div
          className={`${buttonContainerClass}`}
        >
          <button
            type="submit"
            disabled={
              !isDirty || !isValid || isSubmitting || loading || disabled
            }
            className={`
              ${fullWidthClass}
              px-6 py-3 bg-blue-600 text-white rounded-lg font-medium transition-colors cursor-pointer
              hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${
                !isDirty || !isValid || isSubmitting || loading || disabled
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }
            `}
          >
            {isSubmitting || loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {loading ? "Processing..." : "Submitting..."}
              </span>
            ) : (
              submitButtonText
            )}
          </button>

          {formConfig.enableReset && (
            <button
              type="button"
              onClick={() => reset()}
              disabled={!isDirty || isSubmitting || loading || disabled}
              className={`
                ${fullWidthClass}
                px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium transition-colors cursor-pointer
                hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                ${
                  !isDirty || isSubmitting || loading || disabled
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }
              `}
            >
              {formConfig.resetButtonText || "Reset"}
            </button>
          )}

          {formConfig.saveAsDraft && onDraftSave && (
            <button
              type="button"
              onClick={() => {
                onDraftSave(watchedValues);
                setIsDraftSaved(true);
                setTimeout(() => setIsDraftSaved(false), 3000);
              }}
              disabled={!isDirty || isSubmitting || loading || disabled}
              className={`
                ${fullWidthClass}
                px-6 py-3 bg-amber-100 text-amber-700 rounded-lg font-medium transition-colors cursor-pointer
                hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2
                ${
                  !isDirty || isSubmitting || loading || disabled
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }
              `}
            >
              Save as Draft
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default DynamicForm;
