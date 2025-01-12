"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { NewIssueFormSchema } from "../definitions";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import axios from "axios";
// import { z } from "zod";
import { useRouter } from "next/navigation";

// type IssueFormData = z.infer<typeof NewIssueFormSchema>;
const NewIssuePage: React.FC = () => {
  const router = useRouter();

  const [error, setError] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(NewIssueFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const priority = watch("priority");

  const submitFormData: SubmitHandler<FieldValues> = async (formData) => {
    setSubmitting(true);
    const { title, description, priority } = formData;
    try {
      const response = await fetch("/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, priority }),
      });

      const data = await response.json();
      if (response.ok) {
        router.push("/issues");
      } else {
        setError(data.error || "Something went wrong");
      }
      //   await axios.post("/api/issues", data);
      // if (issue) {
      //   await axios.patch(`/api/issues/${issue.id}`, data);
      // } else await axios.post("/api/issues", data);
      // if (issue) {
      //   router.push(`/issues/${issue.id}`);
      // } else router.push("/issues");
      // router.refresh();
    } catch (error) {
      console.log(error);
      setSubmitting(false);
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold"> Create New Issue</CardTitle>
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
            <Select
              value={priority}
              onValueChange={(value) => setValue("priority", value)}
            >
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MINOR">Minor</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="LOWEST">Lowest</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="HIGHEST">Highest</SelectItem>
                <SelectItem value="CRITICAL">Critical</SelectItem>
              </SelectContent>
            </Select>
            {errors.priority && (
              <p className="text-sm text-red-500">
                {errors.priority.message as string}
              </p>
            )}
          </div>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Submit New Issue
              {/* {issue ? "Update the Issue" : "Submit New Issue"}{" "} */}
            </Button>
          </CardFooter>
        </CardContent>
      </form>
    </Card>
  );
};

export default NewIssuePage;
