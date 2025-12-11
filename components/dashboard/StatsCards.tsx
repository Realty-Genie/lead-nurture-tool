"use client";

import { Users, Zap, Mail, BarChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
    {
        title: "Total Leads",
        value: "0",
        icon: Users,
    },
    {
        title: "Active Campaigns",
        value: "0",
        icon: Zap,
    },
    {
        title: "Response Rate",
        value: "0%",
        icon: Mail,
    },
    {
        title: "Conversion Rate",
        value: "0%",
        icon: BarChart,
    },
];

export function StatsCards() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {stat.title}
                        </CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
