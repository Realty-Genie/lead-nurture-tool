"use client";

import { useState } from "react";
import { Edit, Loader2 } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

interface Campaign {
    id: string;
    name: string;
    totalLeads: number;
    createdAt: string;
    status: string;
    objective: string;
    targetPersona: string;
    description: string;
}

interface EditCampaignModalProps {
    campaign: Campaign;
}

export function EditCampaignModal({ campaign }: EditCampaignModalProps) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter()
    const { getToken } = useAuth()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        // Log data as requested, skipping API call for now
        console.log("Updated Campaign Data:", {
            ...campaign,
            name: data.name,
            objective: data.objective,
            targetPersona: data.persona,
            description: data.description,
        });

        const token = await getToken()
        if (!token) {
            toast.error("Failed to update campaign");
            return;
        }
        setIsSubmitting(true);
        const response = await api.patch('/api/campaigns/update', {
            campaignId: campaign.id,
            name: data.name,
            objective: data.objective,
            targetPersona: data.persona,
            description: data.description,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.data.success) {
            toast.success("Campaign updated successfully");
        } else {
            toast.error("Failed to update campaign");
        }
        setIsSubmitting(false);
        setOpen(false);
        router.refresh();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                    <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Campaign</DialogTitle>
                    <DialogDescription>
                        Make changes to your campaign here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Campaign Name</Label>
                            <Input
                                id="name"
                                name="name"
                                defaultValue={campaign.name}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="objective">Objective</Label>
                            <Select name="objective" defaultValue={campaign.objective} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select objective" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="nurture">Nurture Leads</SelectItem>
                                    <SelectItem value="reengage">Re-engage Cold Leads</SelectItem>
                                    <SelectItem value="promote">Promote Listing</SelectItem>
                                    <SelectItem value="event">Event Invitation</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="persona">Target Persona</Label>
                            <Input
                                id="persona"
                                name="persona"
                                defaultValue={campaign.targetPersona}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description (Optional)</Label>
                            <Textarea
                                id="description"
                                name="description"
                                defaultValue={campaign.description}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
