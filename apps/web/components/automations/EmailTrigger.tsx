"use client";

import { useState } from "react";
import { Sparkles, Send, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Campaign {
    id: string;
    name: string;
    persona: string;
    objective: string;
    status: string;
}

export function EmailTrigger({ campaign, onBack }: { campaign: Campaign; onBack: () => void }) {
    const [generated, setGenerated] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Email Automations</h1>
                    <p className="text-muted-foreground">
                        Create and manage multi-touch email automations with AI-generated drafts
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="secondary" className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <CheckCircle2 className="mr-2 h-4 w-4" /> Mark as Done
                    </Button>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <Sparkles className="mr-2 h-4 w-4" /> Mail Trigger
                    </Button>
                </div>
            </div>

            <Button variant="outline" onClick={onBack} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Campaigns
            </Button>

            <Card className="bg-card border-border">
                <CardHeader>
                    <CardTitle className="text-xl">{campaign.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-4">
                        <div className="rounded-lg bg-muted p-4">
                            <div className="text-sm font-medium text-muted-foreground">Persona</div>
                            <div className="font-semibold">{campaign.persona}</div>
                        </div>
                        <div className="rounded-lg bg-muted p-4">
                            <div className="text-sm font-medium text-muted-foreground">Objective</div>
                            <div className="font-semibold">{campaign.objective}</div>
                        </div>
                        <div className="rounded-lg bg-muted p-4">
                            <div className="text-sm font-medium text-muted-foreground">Status</div>
                            <div className="font-semibold text-green-500">{campaign.status}</div>
                        </div>
                        <div className="rounded-lg bg-muted p-4">
                            <div className="text-sm font-medium text-muted-foreground">Leads</div>
                            <div className="font-semibold">—</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-green-900/50 bg-green-950/10">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-500">
                        <Send className="h-5 w-5" /> Scheduled Emails
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">No pending emails found for this campaign</p>
                </CardContent>
            </Card>

            <Button className="w-full py-8 text-lg font-medium text-muted-foreground" variant="secondary" disabled>
                <CheckCircle2 className="mr-2 h-6 w-6" /> Campaign Already Launched
            </Button>
        </div>
    );
}
