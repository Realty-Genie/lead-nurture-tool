import { ComingSoon } from "@/components/dashboard/ComingSoon";

export default function AnalyticsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                <p className="text-muted-foreground">View your campaign performance</p>
            </div>
            <ComingSoon />
        </div>
    );
}
