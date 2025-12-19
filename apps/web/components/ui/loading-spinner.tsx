import * as React from "react";

export function LoadingSpinner({ size = 24, className = "" }: { size?: number; className?: string }) {
    const px = size;
    return (
        <svg
            role="status"
            aria-label="loading"
            className={`animate-spin text-muted-foreground ${className}`}
            width={px}
            height={px}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                className="opacity-20"
            />
            <path
                d="M22 12a10 10 0 00-10-10"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                className="opacity-90"
            />
        </svg>
    );
}

export default LoadingSpinner;
