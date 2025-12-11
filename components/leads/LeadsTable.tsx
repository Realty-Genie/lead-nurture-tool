"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const leads = [
    // Mock data
    {
        id: "1",
        name: "Alice Johnson",
        email: "alice@example.com",
        phone: "+1 (555) 123-4567",
        campaign: "Summer Buyer Outreach",
        status: "New",
        date: "2025-12-11",
    },
    {
        id: "2",
        name: "Bob Smith",
        email: "bob@example.com",
        phone: "+1 (555) 987-6543",
        campaign: "Cold Lead Re-engagement",
        status: "Contacted",
        date: "2025-12-10",
    },
];

export function LeadsTable() {
    if (leads.length === 0) {
        return (
            <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <p>No leads yet</p>
                    <p className="text-sm">Start by adding your first lead or importing leads from a file</p>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Campaign</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date Added</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {leads.map((lead) => (
                        <TableRow key={lead.id}>
                            <TableCell className="font-medium">{lead.name}</TableCell>
                            <TableCell>{lead.email}</TableCell>
                            <TableCell>{lead.phone}</TableCell>
                            <TableCell>{lead.campaign}</TableCell>
                            <TableCell>
                                <Badge variant="outline">{lead.status}</Badge>
                            </TableCell>
                            <TableCell>{lead.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
