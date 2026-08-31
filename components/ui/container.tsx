import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/utilities/cn";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[var(--container-max)] px-5 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}
