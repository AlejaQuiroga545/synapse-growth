import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "vmind-card",
  {
    variants: {
      variant: {
        default: "p-6",
        compact: "p-4",
        story: "p-8 bg-gradient-to-br from-card via-card to-primary/5",
        floating: "p-6 hover:shadow-glow transform hover:-translate-y-1 transition-all duration-300",
        node: "p-4 border-2 shadow-node hover:shadow-soft transition-all duration-200"
      },
      size: {
        default: "",
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        full: "w-full"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const VMindCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, size, className }))}
      {...props}
    />
  )
);
VMindCard.displayName = "VMindCard";

const VMindCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
));
VMindCardHeader.displayName = "VMindCardHeader";

const VMindCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-semibold leading-none tracking-tight text-card-foreground", className)}
    {...props}
  />
));
VMindCardTitle.displayName = "VMindCardTitle";

const VMindCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
VMindCardDescription.displayName = "VMindCardDescription";

const VMindCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
));
VMindCardContent.displayName = "VMindCardContent";

const VMindCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
));
VMindCardFooter.displayName = "VMindCardFooter";

export { VMindCard, VMindCardHeader, VMindCardFooter, VMindCardTitle, VMindCardDescription, VMindCardContent };