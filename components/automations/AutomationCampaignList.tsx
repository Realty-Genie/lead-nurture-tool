"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Campaign {
    id: string;
    name: string;
    persona: string;
    objective: string;
    status: string;
}

export function AutomationCampaignList({ onSelect }: { onSelect: (campaign: Campaign) => void }) {
    // Mock data
    const campaigns: Campaign[] = [
        {
            id: "1",
            name: "Summer Buyer Outreach",
            persona: "First-time Homebuyers",
            objective: "Nurture Leads",
            status: "Active",
        },
        {
            id: "2",
            name: "Cold Lead Re-engagement",
            persona: "Cold Leads",
            objective: "Re-engage",
            status: "Paused",
        },
    ];

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign) => (
                <Card
                    key={campaign.id}
                    className="cursor-pointer transition-colors hover:bg-accent/50"
                    onClick={() => onSelect(campaign)}
                >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-bold">{campaign.name}</CardTitle>
                        <Badge variant={campaign.status === "Active" ? "default" : "secondary"} className={campaign.status === "Active" ? "bg-green-500 hover:bg-green-600" : ""}>
                            {campaign.status}
                        </Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="mt-2 space-y-2">
                            <div>
                                <span className="text-xs text-muted-foreground">Persona:</span>
                                <p className="text-sm font-medium">{campaign.persona}</p>
                            </div>
                            <div>
                                <span className="text-xs text-muted-foreground">Objective:</span>
                                <p className="text-sm font-medium">{campaign.objective}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
