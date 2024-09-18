import { FC, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { z } from 'zod';


const buttonSchema = z.object({
  children: z.custom<React.ReactNode>(),
  className: z.string().optional(),
  variant: z.enum(['primary', 'secondary', 'tertiary', 'ghost']).optional(),
  size: z.enum(['sm', 'md', 'lg']).optional(),
  onClick: z.function().args(z.custom<React.MouseEvent<HTMLButtonElement>>()).optional(),
  disabled: z.boolean().optional(),
  type: z.enum(['button', 'submit', 'reset']).optional(),
});

type ButtonProps = z.infer<typeof buttonSchema>;


const buttonVariants = {
  variants: {
    variant: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-white border border-blue-600 text-blue-600 hover:bg-blue-50',
      tertiary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
      ghost: 'bg-transparent text-blue-600 hover:bg-blue-50',
    },
    size: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
};

const getButtonClassNames = (
  variant: keyof typeof buttonVariants.variants.variant,
  size: keyof typeof buttonVariants.variants.size
) => {
  const baseClass = 'rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';
  const variantClass = buttonVariants.variants.variant[variant] || buttonVariants.defaultVariants.variant;
  const sizeClass = buttonVariants.variants.size[size] || buttonVariants.defaultVariants.size;

  return cn(baseClass, variantClass, sizeClass);
};

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
  ...props
}) => {
  // Validate props using Zod schema
  try {
    buttonSchema.parse({ children, className, variant, size, onClick, disabled, type, ...props });
  } catch (error) {
    console.error('Button props validation failed:', error);
    return null; 
  }

  return (
    <button
      className={cn(
        getButtonClassNames(variant, size),
        disabled && 'opacity-50 cursor-not-allowed',
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
