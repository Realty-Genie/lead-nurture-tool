"use client";

import { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@clerk/nextjs";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { publishLeadsBatchAdded } from "@/lib/events";

export function ImportLeadModal() {
    const [open, setOpen] = useState(false);
    const [campaigns, setCampaigns] = useState<Array<{ id: string; name: string }>>([]);
    const [selectedCampaign, setSelectedCampaign] = useState<string | undefined>(undefined);
    const { getToken } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const fetchCampaigns = async () => {
            if (!open) return;
            try {
                const response = await api.get('/api/campaigns/all', {
                    headers: {
                        'Authorization': `Bearer ${await getToken()}`
                    },
                });
                setCampaigns(response.data);
            } catch (error) {
                console.error('Error fetching campaigns:', error);
            }
        }
        fetchCampaigns()
    }, [open, getToken])
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle CSV import logic here
        const fileInput = document.getElementById("file") as HTMLInputElement | null;
        if (!fileInput?.files?.length) {
            console.warn("No file selected");
            return;
        }

        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onerror = () => {
            console.error("Error reading file", reader.error);
        };

        reader.onload = async () => {
            const text = String(reader.result || "");
            const rows = text.split(/\r?\n/).filter((r) => r.trim() !== "");
            if (rows.length === 0) {
                console.warn("CSV is empty");
                return;
            }

            // Split CSV line respecting quoted commas
            const splitLine = (line: string) =>
                line
                    .split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/)
                    .map((c) => c.trim().replace(/^"|"$/g, ""));

            const headers = splitLine(rows[0]).map((h) => h.toLowerCase());
            const idx = {
                name: headers.indexOf("name"),
                email: headers.indexOf("email"),
                phone: headers.indexOf("phone"),
                address: headers.indexOf("address"),
            };

            const leads = rows.slice(1).map((row) => {
                const cols = splitLine(row);
                return {
                    name: idx.name >= 0 ? cols[idx.name] || "" : "",
                    email: idx.email >= 0 ? cols[idx.email] || "" : "",
                    phone: idx.phone >= 0 ? cols[idx.phone] || "" : "",
                    address: idx.address >= 0 ? cols[idx.address] || "" : "",
                };
            }).filter(l => l.name || l.email || l.phone || l.address);

            console.log("Parsed leads:", leads);
            try {
                const response = await api.post('/api/leads/create/batch', {
                    leads,
                    campaignId: selectedCampaign,
                }, {
                    headers: {
                        'Authorization': `Bearer ${await getToken()}`
                    }
                })
                console.log("Import response:", response.data);

                // Publish the newly created leads to other parts of the app (and other tabs)
                try {
                    publishLeadsBatchAdded(response.data.leads ?? response.data ?? []);
                } catch (e) {
                    // ignore publish errors
                }

                toast.success("Leads imported successfully");
                setSelectedCampaign(undefined);
                setOpen(false);
                router.refresh();
            } catch (error) {
                console.error("Import error:", error);
                toast.error("Failed to import leads. Please check your CSV format.");
            }
        };

        reader.readAsText(file);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" /> Import
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-105.5">
                <DialogHeader>
                    <DialogTitle>Import Leads</DialogTitle>
                    <DialogDescription>
                        Upload a CSV file to import leads into a campaign.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="campaign">Select Campaign</Label>
                            <Select required onValueChange={(val) => setSelectedCampaign(val)} value={selectedCampaign}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select campaign" />
                                </SelectTrigger>
                                <SelectContent>
                                    {campaigns.map((campaign) => (
                                        <SelectItem key={campaign.id} value={campaign.id}>
                                            {campaign.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="file">CSV File</Label>
                            <Input id="file" type="file" accept=".csv" required />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Import Leads</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
