"use client";

import { useState } from "react";
import { Play, Pause, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Campaign {
    id: string;
    name: string;
    status: "active" | "draft" | "paused";
    leads: number;
    createdAt: string;
}

export function CampaignCard({ campaign }: { campaign: Campaign }) {
    const [status, setStatus] = useState(campaign.status);

    const toggleStatus = () => {
        setStatus(status === "active" ? "paused" : "active");
    };

    return (
        <Card className="group relative overflow-hidden transition-all hover:border-primary/50">
            <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
                <Button variant="destructive" size="icon" className="h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-bold">{campaign.name}</CardTitle>
                <Badge variant={status === "active" ? "default" : "secondary"} className={status === "active" ? "bg-green-500 hover:bg-green-600" : ""}>
                    {status}
                </Badge>
            </CardHeader>
            <CardContent>
                <div className="mt-4 rounded-md bg-muted p-4">
                    <div className="text-sm font-medium text-muted-foreground">Total Leads</div>
                    <div className="text-2xl font-bold">{campaign.leads}</div>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">Created {campaign.createdAt}</p>
            </CardContent>
            <CardFooter className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="w-full">
                    <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
                <Button
                    variant={status === "active" ? "secondary" : "default"}
                    size="sm"
                    className="w-full"
                    onClick={toggleStatus}
                >
                    {status === "active" ? (
                        <>
                            <Pause className="mr-2 h-4 w-4" /> Pause
                        </>
                    ) : (
                        <>
                            <Play className="mr-2 h-4 w-4" /> Resume
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}
