// Adapted from Neobrutalism.com Radix registry. See README.md for provenance.
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  cn(
    "retro-button group/button font-sans font-medium inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm whitespace-nowrap select-none transition-[transform,box-shadow,background-color] duration-200",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring aria-invalid:border-destructive",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4"
  ),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        inverse: "bg-background text-foreground",
        secondary: "bg-retro-ink text-background",
        destructive: "bg-destructive text-primary-foreground",
        outline: "bg-transparent",
        ghost: "bg-transparent",
        link: "bg-transparent underline underline-offset-4",
      },
      size: {
        default: "min-h-12 px-5 py-3 text-sm",
        xs: "min-h-11 px-3 py-2 text-sm",
        sm: "min-h-11 px-4 py-2 text-sm",
        lg: "min-h-12 px-6 py-3 text-base",
        icon: "size-11 p-2",
        "icon-xs": "size-11 p-2",
        "icon-sm": "size-11 p-2",
        "icon-lg": "size-12 p-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
