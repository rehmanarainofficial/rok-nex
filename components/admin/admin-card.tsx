import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/utilities/cn";

type AdminCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function AdminCard({ children, className, ...props }: AdminCardProps) {
  return (
    <div
      className={cn("rounded-lg border border-black/10 bg-white shadow-sm", className)}
      {...props}
    >
      {children}
    </div>
  );
}
