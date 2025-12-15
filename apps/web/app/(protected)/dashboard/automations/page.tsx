"use client";

import { useState } from "react";
import { AutomationCampaignList } from "@/components/automations/AutomationCampaignList";
import { EmailTrigger } from "@/components/automations/EmailTrigger";

interface Campaign {
    id: string;
    name: string;
    persona: string;
    objective: string;
    status: string;
}

export default function AutomationsPage() {
    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

    return (
        <div className="space-y-8">
            {!selectedCampaign ? (
                <>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Automations</h1>
                        <p className="text-muted-foreground">
                            Select a campaign to manage automations
                        </p>
                    </div>
                    <AutomationCampaignList onSelect={setSelectedCampaign} />
                </>
            ) : (
                <EmailTrigger
                    campaign={selectedCampaign}
                    onBack={() => setSelectedCampaign(null)}
                />
            )}
        </div>
    );
}
