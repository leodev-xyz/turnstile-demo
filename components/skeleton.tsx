import clsx from "clsx";
import React from "react";

export default function Skeleton({ className }: { className?: string }) {
    return (
        <div
            className={clsx(
                "skeleton",
                "bg-coolGray-400 bg-gradient-to-r from-coolGray-400 via-coolGray-300 to-coolGray-400 bg-no-repeat",
                className
            )}
        />
    );
}
