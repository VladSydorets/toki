"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/utility/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";

import { PasswordSchema } from "../definitions";

export default function PasswordForm() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [notMatchingError, setNotMatchingError] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const cancelButton = () => {
    setNotMatchingError(false);
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowRepeatPassword(false);
    reset();
  };

  const submitFormData: SubmitHandler<FieldValues> = async (formData) => {
    setSubmitting(true);
    const { currentPassword, newPassword, repeatNewPassword } = formData;

    const doesNewPasswordsMatch = newPassword === repeatNewPassword;
    if (!doesNewPasswordsMatch) {
      setNotMatchingError(true);
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/users/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to update the user data: ${response.statusText}`
        );
      }
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    } finally {
      setSubmitting(false);
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(PasswordSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Use this form if you need to change or update your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submitFormData)}>
          <CardContent className="p-0">
            <div className="flex flex-col gap-4 md:flex-row md:gap-8">
              <div className="space-y-4 w-full">
                <div className="flex flex-col items-start w-full gap-3">
                  <div className="space-y-2 w-full">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        type={showCurrentPassword ? "text" : "password"}
                        id="currentPassword"
                        placeholder="Enter your current password"
                        {...register("currentPassword")}
                      />{" "}
                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="absolute right-2 top-0 cursor-pointer h-full"
                      >
                        {showCurrentPassword ? "🙈" : "👁️"}
                      </button>
                    </div>
                    {errors.currentPassword && (
                      <ErrorMessage
                        errorMessage={errors.currentPassword.message as string}
                      />
                    )}
                  </div>
                  <div className="space-y-2 w-full">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        id="newPassword"
                        placeholder="Enter your new password"
                        {...register("newPassword")}
                      />{" "}
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-2 top-0 cursor-pointer h-full"
                      >
                        {showNewPassword ? "🙈" : "👁️"}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <ErrorMessage
                        errorMessage={errors.newPassword.message as string}
                      />
                    )}
                  </div>
                  <div className="space-y-2 w-full">
                    <Label htmlFor="repeatNewPassword">
                      Repeat New Password
                    </Label>
                    <div className="relative">
                      <Input
                        type={showRepeatPassword ? "text" : "password"}
                        id="repeatNewPassword"
                        placeholder="Repeat your new password"
                        {...register("repeatNewPassword")}
                      />{" "}
                      <button
                        type="button"
                        onClick={() =>
                          setShowRepeatPassword(!showRepeatPassword)
                        }
                        className="absolute right-2 top-0 cursor-pointer h-full"
                      >
                        {showRepeatPassword ? "🙈" : "👁️"}
                      </button>
                    </div>
                    {errors.repeatNewPassword && (
                      <ErrorMessage
                        errorMessage={
                          errors.repeatNewPassword.message as string
                        }
                      />
                    )}
                    {notMatchingError && (
                      <ErrorMessage errorMessage="Password does not match" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 border-t p-6 pb-0">
            <Button
              variant="outline"
              type="button"
              onClick={() => cancelButton()}
            >
              Cancel
            </Button>
            <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }}>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
              >
                {isSubmitting && <Spinner size="sm" />}
                Update Password
              </Button>
            </motion.div>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
