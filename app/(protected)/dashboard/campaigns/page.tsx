"use client";

import { useState } from "react";
import { CreateCampaignModal } from "@/components/campaigns/CreateCampaignModal";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function CampaignsPage() {
    // Mock data
    const [campaigns, setCampaigns] = useState([
        {
            id: "1",
            name: "Summer Buyer Outreach",
            status: "active" as const,
            leads: 124,
            createdAt: "12/11/2025",
        },
        {
            id: "2",
            name: "Cold Lead Re-engagement",
            status: "paused" as const,
            leads: 45,
            createdAt: "10/11/2025",
        },
    ]);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
                    <p className="text-muted-foreground">
                        Organize and manage your lead campaigns
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="secondary" className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <CheckCircle2 className="mr-2 h-4 w-4" /> Mark as Done & Next
                    </Button>
                    <CreateCampaignModal />
                </div>
            </div>

            {campaigns.length === 0 ? (
                <div className="flex h-[400px] flex-col items-center justify-center rounded-lg border border-dashed">
                    <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                        <h3 className="mt-4 text-lg font-semibold">No campaigns yet</h3>
                        <p className="mb-4 mt-2 text-sm text-muted-foreground">
                            You haven't created any campaigns. Start by creating your first
                            campaign to nurture your leads.
                        </p>
                        <CreateCampaignModal />
                    </div>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {campaigns.map((campaign) => (
                        <CampaignCard key={campaign.id} campaign={campaign} />
                    ))}
                </div>
            )}
        </div>
    );
}
