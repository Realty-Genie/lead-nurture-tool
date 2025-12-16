"use client";

import Link from "next/link";
import { Layers, Users, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function GettingStarted() {
    // TODO: check if user has campaigns. For now, assume 0.
    const hasCampaigns = false;

    if (hasCampaigns) return null;

    return (
        <Card className="mb-8 bg-card border-border">
            <CardHeader>
                <CardTitle className="text-xl">Getting Started</CardTitle>
                <CardDescription>Your journey to automation</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                    <Link href="/dashboard/campaigns" className="group block">
                        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center transition-colors hover:bg-accent/50 group-hover:border-primary">
                            <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                                <Layers className="h-6 w-6" />
                            </div>
                            {/* TODO: Creating campaigns*/}
                            <h3 className="font-semibold">Create Campaign</h3>
                            <p className="text-sm text-muted-foreground">Organize leads</p>
                        </div>
                    </Link>
                    <Link href="/dashboard/leads" className="group block">
                        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center transition-colors hover:bg-accent/50 group-hover:border-primary">
                            <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                                <Users className="h-6 w-6" />
                            </div>
                            <h3 className="font-semibold">Import Leads</h3>
                            <p className="text-sm text-muted-foreground">Add contacts</p>
                        </div>
                    </Link>
                    <Link href="/dashboard/automations" className="group block">
                        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center transition-colors hover:bg-accent/50 group-hover:border-primary">
                            <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                                <Zap className="h-6 w-6" />
                            </div>
                            <h3 className="font-semibold">Setup Automations</h3>
                            <p className="text-sm text-muted-foreground">Launch campaigns</p>
                        </div>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
