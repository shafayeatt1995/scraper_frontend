import { cva } from "class-variance-authority";

export { default as Badge } from "./Badge.vue";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        green:
          "text-green-500 bg-green-100 hover:opacity-90 border border-green-200",
        yellow:
          "text-orange-500 bg-orange-100 hover:opacity-90 border border-orange-200",
        rose: "text-rose-500 bg-rose-100 hover:opacity-90 border border-rose-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
