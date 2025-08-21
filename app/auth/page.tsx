"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth/useAuth";
import { loginSchema, type LoginValues } from "@/lib/validation/auth.schema";
import { type RandomUserApi } from "@/lib/types/randomUser";
import styles from "./Auth.module.scss";

export default function AuthPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginValues>({ phone: "" });
  const [errors, setErrors] = useState<Partial<LoginValues>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [networkError, setNetworkError] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof LoginValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    setNetworkError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNetworkError("");

    try {
      // Validate form
      loginSchema.parse(formData);
      setIsLoading(true);

      // Fetch random user
      const response = await fetch(
        "https://randomuser.me/api/?results=1&nat=us",
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data: RandomUserApi = await response.json();
      const userData = data.results[0];

      // Map to our User type
      const user = {
        id: userData.login.uuid,
        name: `${userData.name.first} ${userData.name.last}`,
        email: userData.email,
        avatar: userData.picture.thumbnail,
      };

      // Login and redirect
      login(user);
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error && error.message.includes("Failed to fetch")) {
        setNetworkError("Connection error. Please try again.");
      } else if (error instanceof Error) {
        // Zod validation error
        const zodError = error as {
          errors?: Array<{ path: string[]; message: string }>;
        };
        if (zodError.errors) {
          const fieldErrors: Partial<LoginValues> = {};
          zodError.errors.forEach((err) => {
            fieldErrors[err.path[0] as keyof LoginValues] = err.message;
          });
          setErrors(fieldErrors);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Sign in to your account</p>

        {networkError && (
          <div className={styles.networkError} role="alert">
            {networkError}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="09123456789"
            label="Phone Number"
            error={errors.phone}
            disabled={isLoading}
            maxLength={11}
            autoComplete="tel"
            inputMode="numeric"
            pattern="[0-9]*"
          />

          <div className={styles.actions}>
            <Button
              type="submit"
              loading={isLoading}
              disabled={isLoading}
              className={styles.submitButton}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
