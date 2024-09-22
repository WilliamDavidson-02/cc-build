import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { z } from "zod";

const buttonSchema = z.object({
  children: z.custom<ReactNode>(),
  className: z.string().optional(),
  variant: z.enum(["blue", "white", "lightblue", "ghost"]).optional(),
  size: z.enum(["small", "medium", "large"]).optional(),
  onClick: z
    .function()
    .args(z.custom<React.MouseEvent<HTMLButtonElement>>())
    .optional(),
  disabled: z.boolean().optional(),
  type: z.enum(["button", "submit", "reset"]).optional(),
});

type ButtonProps = z.infer<typeof buttonSchema>;

const buttonVariants = {
  variants: {
    variant: {
      blue: "bg-blueZodiac rounded-[100px] text-white hover:bg-blue-700",
      white:
        "bg-[#FFFFFF] border border-[#151515] rounded-[100px] text-[#151515] hover:bg-white-100",
      lightblue:
        "bg-bostonBlue rounded-[100px] text-[#FFFFFF] hover:bg-blue-200",
      ghost:
        "text-paleSky border border-paleSky bg-seaShell rounded-[100px] hover:bg-paleSky hover:text-seaShell",
    },
    size: {
      small: "px-4 py-2 text-sm",
      medium: "px-6 py-3 text-base",
      large: "px-8 py-4 text-lg",
    },
  },
  defaultVariants: {
    variant: "blue",
    size: "md",
  },
};

const getButtonClassNames = (
  variant: keyof typeof buttonVariants.variants.variant,
  size: keyof typeof buttonVariants.variants.size
) => {
  const baseClass =
    "rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
  const variantClass =
    buttonVariants.variants.variant[variant] ||
    buttonVariants.defaultVariants.variant;
  const sizeClass =
    buttonVariants.variants.size[size] || buttonVariants.defaultVariants.size;

  return cn(baseClass, variantClass, sizeClass);
};

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "blue",
  size = "medium",
  onClick,
  disabled = false,
  type = "button",
  ...props
}) => {
  // Validate props using Zod schema
  try {
    buttonSchema.parse({
      children,
      className,
      variant,
      size,
      onClick,
      disabled,
      type,
      ...props,
    });
  } catch (error) {
    console.error("Button props validation failed:", error);
    return null;
  }
  /*
Example usage: 
<Button variant="blue" size="medium">
  primary
</Button>
*/
  return (
    <button
      className={cn(
        "flex gap-2 justify-center items-center",
        getButtonClassNames(variant, size),
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
