"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
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

export function CreateCampaignModal() {
    const [open, setOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" /> New Campaign
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Campaign</DialogTitle>
                    <DialogDescription>
                        Set up a new campaign to nurture your leads.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Campaign Name</Label>
                            <Input id="name" placeholder="e.g., Summer Buyer Outreach" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="objective">Objective</Label>
                            <Select required>
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
                            <Input id="persona" placeholder="e.g., First-time Homebuyers" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description (Optional)</Label>
                            <Textarea id="description" placeholder="Briefly describe the campaign..." />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Create Campaign</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
