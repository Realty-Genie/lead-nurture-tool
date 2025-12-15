import { ComingSoon } from "@/components/dashboard/ComingSoon";

export default function HelpPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
                <p className="text-muted-foreground">Get help with using the platform</p>
            </div>
            <ComingSoon />
        </div>
    );
}
