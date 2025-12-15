"use client";

import { ImportLeadModal } from "@/components/leads/ImportLeadModal";
import { AddLeadModal } from "@/components/leads/AddLeadModal";
import { LeadsTable } from "@/components/leads/LeadsTable";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function LeadsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
                    <p className="text-muted-foreground">
                        Manage and track all your leads in one place
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="secondary" className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <CheckCircle2 className="mr-2 h-4 w-4" /> Mark as Done & Next
                    </Button>
                    <ImportLeadModal />
                    <AddLeadModal />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search by email or name..."
                        className="pl-8"
                    />
                </div>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All Batches" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Batches</SelectItem>
                        <SelectItem value="batch1">Batch 1</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
            </div>

            <LeadsTable />
        </div>
    );
}
