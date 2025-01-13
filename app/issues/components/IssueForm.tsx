"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { NewIssueFormSchema } from "../definitions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function IssueForm({ issue }: { issue?: Issue }) {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const submitFormData: SubmitHandler<FieldValues> = async (formData) => {
    setSubmitting(true);
    const { title, description, priority } = formData;
    try {
      if (issue) {
        await fetch(`/api/issues/${issue.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description, priority }),
        });
      } else {
        await fetch("/api/issues", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description, priority }),
        });
      }
      router.push("/issues");
    } catch (error) {
      console.log(error);
      setSubmitting(false);
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(NewIssueFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {" "}
          {issue ? "Update the Issue" : "Create New Issue"}
        </CardTitle>
      </CardHeader>
      {error && (
        <div className="mb-5" color="red">
          <p>An unexpected error has occured</p>
        </div>
      )}
      <form onSubmit={handleSubmit((data) => submitFormData(data))}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title:</Label>
            <Input
              type="text"
              id="title"
              defaultValue={issue?.title}
              placeholder="Enter issue title"
              {...register("title")}
              required
            />{" "}
            {errors.title && (
              <p className="text-sm text-red-500">
                {errors.title.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description:</Label>
            <Textarea
              id="description"
              defaultValue={issue?.description ?? ""}
              placeholder="Describe the issue"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Priority:</Label>
            <Controller
              name="priority"
              control={control}
              defaultValue={issue?.priority ?? "MEDIUM"}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => setValue("priority", value)}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MINOR">Minor</SelectItem>
                    <SelectItem value="LOWEST">Lowest</SelectItem>
                    <SelectItem value="LOW">Low</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="HIGH">High</SelectItem>
                    <SelectItem value="HIGHEST">Highest</SelectItem>
                    <SelectItem value="CRITICAL">Critical</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.priority && (
              <p className="text-sm text-red-500">
                {errors.priority.message as string}
              </p>
            )}
          </div>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {issue ? "Update the Issue" : "Submit New Issue"}
            </Button>
          </CardFooter>
        </CardContent>
      </form>
    </Card>
  );
}
