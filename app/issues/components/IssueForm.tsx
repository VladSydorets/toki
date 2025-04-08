"use client";

import { CirclePlus, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
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
import ErrorMessage from "@/components/utility/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue, User } from "@prisma/client";
import { Label } from "@radix-ui/react-label";

import { IssueFormSchema } from "../definitions";
import SelectUsers from "./SelectUsers";

interface IssueFormProps {
  issue?: Issue;
  users: User[];
  onSuccess?: () => void;
}

export default function IssueForm({ issue, users, onSuccess }: IssueFormProps) {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);

  const submitFormData: SubmitHandler<FieldValues> = async (formData) => {
    setSubmitting(true);
    const { title, description, type, priority, status, assignedToId } =
      formData;

    try {
      let response;
      if (issue) {
        response = await fetch(`/api/issues/${issue.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            type,
            priority,
            status,
            assignedToId,
          }),
        });
      } else {
        response = await fetch("/api/issues", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            type,
            priority,
            status,
            assignedToId,
          }),
        });
      }

      if (!response.ok) {
        throw new Error(
          `Failed to ${issue ? "update" : "create"} issue: ${
            response.statusText
          }`
        );
      }

      const updatedIssue = await response.json();
      const redirectId = issue ? issue.id : updatedIssue.id;

      router.push(`/issues/${redirectId}`);
      if (onSuccess) onSuccess();
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
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(IssueFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  return (
    <Card className="w-full mx-auto">
      {!issue && (
        <CardHeader className="pb-0">
          <CardTitle className="text-2xl font-bold">Create New Issue</CardTitle>
        </CardHeader>
      )}
      <form onSubmit={handleSubmit(submitFormData)}>
        <CardContent className="space-y-6 pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:gap-8">
            <div className="space-y-4 sm:w-3/4">
              <div className="space-y-2 sm:w-1/2">
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
                  <ErrorMessage errorMessage={errors.title.message as string} />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description:</Label>
                <Textarea
                  id="description"
                  defaultValue={issue?.description ?? ""}
                  placeholder="Describe the issue"
                  className="h-44"
                  {...register("description")}
                />
                {errors.description && (
                  <ErrorMessage
                    errorMessage={errors.description.message as string}
                  />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-y-4 gap-x-2 md:w-1/4">
              <div className="space-y-2">
                <Label htmlFor="type">Type:</Label>
                <Controller
                  name="type"
                  control={control}
                  defaultValue={issue?.type ?? "FEATURE"}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(value) => setValue("type", value)}
                    >
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BUG">Bug</SelectItem>
                        <SelectItem value="FEATURE">Feature</SelectItem>
                        <SelectItem value="ENHANCEMENT">Enhancement</SelectItem>
                        <SelectItem value="DOCUMENTATION">
                          Documentation
                        </SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.type && (
                  <ErrorMessage errorMessage={errors.type.message as string} />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status:</Label>
                <Controller
                  name="status"
                  control={control}
                  defaultValue={issue?.status ?? "BACKLOG"}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(value) => setValue("status", value)}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BACKLOG">Backlog</SelectItem>
                        <SelectItem value="TO_DO">To do</SelectItem>
                        <SelectItem value="IN_PROGRESS">In progress</SelectItem>
                        <SelectItem value="CODE_REVIEW">Code review</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                        <SelectItem value="CANCELED">Canceled</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.status && (
                  <ErrorMessage
                    errorMessage={errors.status.message as string}
                  />
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
                  <ErrorMessage
                    errorMessage={errors.priority.message as string}
                  />
                )}
              </div>
              <div className="space-y-2">
                <SelectUsers
                  control={control}
                  defaultValue={issue?.assignedToId ?? null}
                  users={users}
                />
                {errors.assignedTo && (
                  <ErrorMessage
                    errorMessage={errors.assignedTo.message as string}
                  />
                )}
              </div>
            </div>
          </div>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {issue ? (
                <>
                  <Pencil className="stroke-2 size-4 mb-[1px]" /> Save Changes
                </>
              ) : (
                <>
                  <CirclePlus className="stroke-2 size-4 mb-[1px]" /> Submit New
                  Issue
                </>
              )}{" "}
              {isSubmitting && <Spinner color="gray" />}
            </Button>
          </CardFooter>
        </CardContent>
      </form>
    </Card>
  );
}
