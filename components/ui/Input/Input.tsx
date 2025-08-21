import React, { forwardRef, useState, useEffect } from "react";
import styles from "./Input.module.scss";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  className?: string;
  maxLength?: number;
  onValueChange?: (value: string) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      value,
      onChange,
      onBlur,
      placeholder,
      type = "text",
      error,
      label,
      className,
      maxLength,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(String(value || ""));
    const [isFocused, setIsFocused] = useState(false);

    // Update internal state when external value changes
    useEffect(() => {
      setInputValue(String(value || ""));
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;

      // For phone number input, filter out non-digit characters
      if (type === "tel") {
        newValue = newValue.replace(/\D/g, "");

        // Limit to maxLength if specified
        if (maxLength && newValue.length > maxLength) {
          newValue = newValue.slice(0, maxLength);
        }
      }

      setInputValue(newValue);

      // Call the original onChange if provided
      if (onChange) {
        const syntheticEvent = {
          ...e,
          target: {
            ...e.target,
            value: newValue,
            name: e.target.name,
          },
        };
        onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
      }

      // Call onValueChange callback if provided
      if (onValueChange) {
        onValueChange(newValue);
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (props.onFocus) {
        props.onFocus(e);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      if (onBlur) {
        onBlur(e);
      }
    };

    const getCharacterCount = () => {
      if (type === "tel" && maxLength) {
        return `${inputValue.length}/${maxLength}`;
      }
      return null;
    };

    const getValidationStatus = () => {
      if (type === "tel" && inputValue) {
        if (inputValue.length < 11) {
          return "incomplete";
        } else if (inputValue.length === 11 && !inputValue.startsWith("09")) {
          return "invalid";
        } else if (inputValue.length === 11 && inputValue.startsWith("09")) {
          return "valid";
        }
      }
      return null;
    };

    const validationStatus = getValidationStatus();
    const characterCount = getCharacterCount();

    return (
      <div className={`${styles.inputWrapper} ${className || ""}`}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        <div className={styles.inputContainer}>
          <input
            ref={ref}
            id={id}
            name={name}
            type={type}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={`${styles.input} ${error ? styles.error : ""} ${
              validationStatus === "valid" ? styles.valid : ""
            } ${validationStatus === "invalid" ? styles.invalid : ""} ${
              isFocused ? styles.focused : ""
            }`}
            aria-invalid={!!error || validationStatus === "invalid"}
            aria-describedby={error ? `${id}-error` : undefined}
            maxLength={maxLength}
            {...props}
          />
          {type === "tel" && (
            <div className={styles.inputIndicators}>
              {characterCount && (
                <span className={styles.characterCount}>{characterCount}</span>
              )}
              {validationStatus && (
                <div
                  className={`${styles.validationIcon} ${styles[validationStatus]}`}
                >
                  {validationStatus === "valid" && (
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {validationStatus === "invalid" && (
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {validationStatus === "incomplete" && (
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        {error && (
          <div id={`${id}-error`} className={styles.errorMessage} role="alert">
            {error}
          </div>
        )}
        {type === "tel" && !error && inputValue && (
          <div className={styles.helpText}>
            {validationStatus === "incomplete" &&
              "Enter 11 digits starting with 09"}
            {validationStatus === "invalid" &&
              "Phone number must start with 09"}
            {validationStatus === "valid" && "Phone number format is correct"}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
