"use client";

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateApplicationSchema } from "@/lib/validation";
import SubmitButton from '../SubmitButton';
import { createApiGateway } from '@/lib/api-calls/developer';

interface ApplicationFormProps {
    onSuccess: () => void;
    onClose: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ onSuccess, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof CreateApplicationSchema>>({
        resolver: zodResolver(CreateApplicationSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    async function onSubmit(values: z.infer<typeof CreateApplicationSchema>) {
        setIsLoading(true);
        try {
            const result = await createApiGateway({ name: values.name, description: values.description });
            onSuccess();
            onClose();
            return result;
        } catch (error) {
            console.error("Error while creating keys: ", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>name</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <SubmitButton
                    isLoading={isLoading}
                    className="bg-green-500 text-white"
                >
                    Generate API Credentials
                </SubmitButton>
            </form>
        </Form>
    );
};

export default ApplicationForm;
