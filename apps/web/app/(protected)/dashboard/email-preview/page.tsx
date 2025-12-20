"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";

export default function EmailPreviewPage() {
    const { getToken } = useAuth();
    const [subject, setSubject] = useState("Welcome to RealtyGenie");
    const [body, setBody] = useState("Hi there! We're excited to help you find your dream home.");
    const [templateStyle, setTemplateStyle] = useState("basic");
    const [loading, setLoading] = useState(false);

    const handlePreview = async () => {
        if (!subject || !body) {
            toast.error("Please enter both subject and body");
            return;
        }

        try {
            setLoading(true);
            const token = await getToken();
            const response = await api.get(
                `/api/mail/preview?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&templateStyle=${templateStyle}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Open preview in a new window
            const previewWindow = window.open('', '_blank', 'width=800,height=600');
            if (previewWindow) {
                previewWindow.document.write(response.data);
                previewWindow.document.close();
            } else {
                toast.error('Please allow pop-ups to view the preview');
            }
        } catch (error: any) {
            console.error('Error generating preview:', error);
            if (error.response?.status === 403) {
                toast.error(error.response?.data?.message || 'Template access denied');
            } else {
                toast.error('Failed to generate preview');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-8 max-w-4xl">
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Email Preview</h1>
                    <p className="text-muted-foreground">
                        Test how your email will look with different templates
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Email Content</CardTitle>
                        <CardDescription>
                            Enter your email details and select a template style
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-medium">
                                Subject
                            </label>
                            <Input
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Enter email subject"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="body" className="text-sm font-medium">
                                Body
                            </label>
                            <Textarea
                                id="body"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                placeholder="Enter email body"
                                className="min-h-[200px]"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="template" className="text-sm font-medium">
                                Template Style
                            </label>
                            <Select value={templateStyle} onValueChange={setTemplateStyle}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a template" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="basic">Basic</SelectItem>
                                    <SelectItem value="branded">Branded</SelectItem>
                                    <SelectItem value="professional">Professional</SelectItem>
                                    <SelectItem value="modern">Modern</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">
                                Note: Some templates may require a higher subscription plan
                            </p>
                        </div>

                        <Button
                            onClick={handlePreview}
                            disabled={loading}
                            className="w-full"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating Preview...
                                </>
                            ) : (
                                <>
                                    <Eye className="mr-2 h-4 w-4" />
                                    Preview Email
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
