import { User } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Spinner from "@/components/Spinner";
import { UserInfoSchema } from "../definitions";

export default function PersonalInfoForm({ userData }: { userData: User }) {
  const [isSubmitting, setSubmitting] = useState(false);

  const cancelButton = () => {
    reset();
  };

  const submitFormData: SubmitHandler<FieldValues> = async (formData) => {
    setSubmitting(true);
    const { firstName, lastName, email } = formData;
    try {
      const response = await fetch("/api/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
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
    resolver: zodResolver(UserInfoSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Update your personal details and contact information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submitFormData)}>
          <CardContent className="p-0">
            <div className="flex flex-col gap-4 md:flex-row md:gap-8">
              <div className="space-y-4 w-full">
                <div className="flex items-center w-full gap-3">
                  <div className="space-y-2 sm:w-1/2 self-start">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      type="text"
                      id="firstName"
                      defaultValue={userData.firstName || ""}
                      placeholder="Enter your first name"
                      {...register("firstName")}
                    />{" "}
                    {errors.firstName && (
                      <p className="text-xs text-red-500">
                        {errors.firstName.message as string}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2 sm:w-1/2 self-start">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      type="text"
                      id="lastName"
                      defaultValue={userData.lastName || ""}
                      placeholder="Enter your last name"
                      {...register("lastName")}
                    />{" "}
                    {errors.lastName && (
                      <p className="text-xs text-red-500">
                        {errors.lastName.message as string}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    type="text"
                    id="email"
                    defaultValue={userData.email || ""}
                    placeholder="Enter your email address"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">
                      {errors.email.message as string}
                    </p>
                  )}
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
                Save Changes
              </Button>
            </motion.div>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
