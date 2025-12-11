"use client";

import { UserButton } from "@clerk/nextjs";

export function Navbar() {
    return (
        <div className="flex h-16 items-center justify-between border-b bg-card px-6">
            <div className="font-semibold text-lg">Dashboard</div>
            <div className="flex items-center gap-4">
                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: "h-10 w-10",
                        },
                    }}
                />
            </div>
        </div>
    );
}
