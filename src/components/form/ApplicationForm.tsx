/* eslint-disable*/
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
import { CopyToClipboard } from "react-copy-to-clipboard";

interface ApplicationFormProps {
    onSuccess: () => void;
    onClose: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ onSuccess, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [applicationId, setApplicationId] = useState<string | null>(null);
    const [applicationSecret, setApplicationSecret] = useState<string | null>(null);

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
            console.log("API Response:", result); 
            if (result.apiKey && result.apiSecret) {
                setApplicationId(result.apiKey);
                setApplicationSecret(result.apiSecret);
                onSuccess();
            } else {
                console.error("Invalid response format:", result);
            }
        } catch (error) {
            console.error("Error while creating keys: ", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            {applicationId && applicationSecret ? (
                <div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">APPLICATION ID</label>
                        <div className="relative flex flex-row gap-2">
                            <input
                                type="text"
                                readOnly
                                value={applicationId}
                                className="block w-full px-3 py-2 mt-1 bg-gray-300 border border-gray-300 rounded-md"
                            />

                        
                            <CopyToClipboard text={applicationId}>
                                <Button className="bg-white">📋</Button>
                            </CopyToClipboard>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">APPLICATION SECRET</label>
                        <div className="flex flex-row gap-4">
                            <input
                                type="text"
                                readOnly
                                value={applicationSecret}
                                className="block w-full px-3 py-2 mt-1 bg-gray3100 border border-gray-300 rounded-md"
                            />
                            <CopyToClipboard text={applicationSecret}>
                                <Button className="bg-white">📋</Button>
                            </CopyToClipboard>
                        </div>
                    </div>
                    <Button onClick={onClose}>OK</Button>
                </div>
            ) : (
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
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
            )}
        </Form>
    );
};

export default ApplicationForm;
