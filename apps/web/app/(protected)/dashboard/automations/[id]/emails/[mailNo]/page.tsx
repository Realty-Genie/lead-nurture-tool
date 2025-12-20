"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Eye, Save, Send } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { api } from "@/lib/api";
import { useAuth } from "@clerk/nextjs";

interface EmailData {
    mail: {
        mailNo: number;
        subject: string;
        body: string;
    };
}

export default function ComposeEmailPage() {
    const { id, mailNo } = useParams();
    const router = useRouter();
    const [subject, setSubject] = useState("");
    const { getToken } = useAuth()
    const [body, setBody] = useState("");
    const [templateStyle, setTemplateStyle] = useState("basic");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // First try to retrieve emails from localStorage (persistent)
        let storedEmails = localStorage.getItem(`campaign_${id}_emails`);

        // Fallback to sessionStorage for backward compatibility
        if (!storedEmails) {
            storedEmails = sessionStorage.getItem('generatedEmails');
        }

        if (storedEmails) {
            const emails: EmailData[] = JSON.parse(storedEmails);
            const email = emails.find(e => e.mail.mailNo === Number(mailNo));

            if (email) {
                setSubject(email.mail.subject);
                setBody(email.mail.body);
            } else {
                toast.error("Email not found");
                router.push(`/dashboard/automations/${id}/emails`);
            }
        } else {
            router.push(`/dashboard/automations/${id}`);
        }
        setLoading(false);
    }, [id, mailNo, router]);
    const handleSave = () => {
        // First try to retrieve emails from localStorage (persistent)
        let storedEmails = localStorage.getItem(`campaign_${id}_emails`);

        // Fallback to sessionStorage for backward compatibility
        if (!storedEmails) {
            storedEmails = sessionStorage.getItem('generatedEmails');
        }

        if (!storedEmails) {
            toast.error("No emails found to save");
            return;
        }

        const emails: EmailData[] = JSON.parse(storedEmails);
        const email = emails.find(e => e.mail.mailNo === Number(mailNo));

        if (email) {
            email.mail.subject = subject;
            email.mail.body = body;

            const updatedEmailsData = JSON.stringify(emails);
            // Save to both localStorage and sessionStorage
            localStorage.setItem(`campaign_${id}_emails`, updatedEmailsData);
            sessionStorage.setItem('generatedEmails', updatedEmailsData);
            toast.success("Email saved successfully!");
        } else {
            toast.error("Email not found");
        }
    }

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <p className="text-muted-foreground">Loading...</p>
            </div>
        );
    }

    const handlePreview = async () => {
        try {
            const token = await getToken();
            const response = await api.get(`/api/mail/preview?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&templateStyle=${templateStyle}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

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
        }
    }


    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button asChild variant="ghost" size="icon">
                        <Link href={`/dashboard/automations/${id}/emails`}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Compose Email</h2>
                        <p className="text-muted-foreground">
                            Edit and customize your email
                        </p>
                    </div>
                </div>

            </div>

            <Card>
                <CardHeader className="flex justify-between">
                    <CardTitle>Mail #{mailNo}</CardTitle>
                    <CardDescription>Edit the subject and body of your email</CardDescription>
                    <div>
                        <Button variant="outline" onClick={handlePreview}>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                        </Button>

                        <Button variant="outline" onClick={handleSave}>
                            <Save className="mr-2 h-4 w-4" />
                            Save
                        </Button>
                    </div>
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
                            className="text-lg"
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
                            className="min-h-[400px] font-mono text-sm"
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
                            Select the template style for your email preview
                        </p>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                        <p className="text-sm text-muted-foreground">
                            {body.length} characters
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
