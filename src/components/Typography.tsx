import React from 'react';
import { FC } from 'react';
import { cn } from '../lib/utils';

type TypographyProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
};

const typographyVariants ={
  variants: {
    variant: { //variant with default textsize if no size is provided
      h1: 'text-6xl font-bold md:text-7xl',
      h2: 'text-4xl font-bold md:text-5xl',
      h3: 'text-3xl font-semibold md:text-4xl',
      h4: 'text-lg font-semibold md:text-xl',
      h5: 'text-md font-medium md:text-lg',
      h6: 'text-md font-medium',
      p: 'font-normal',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-2xl',
      xxl: 'text-3xl',
      xxxl: 'text-5xl',
    },
  },
  compoundVariants: [
    { variant: 'p', size: 'sm', class: 'text-sm' },
    { variant: 'p', size: 'md', class: 'text-base' },
    { variant: 'p', size: 'lg', class: 'text-lg' },
  ],
  defaultVariants: {
    variant: 'p',
    size: 'md',
  },
};

// helperfunction to get the classnames from variant and size
const getTypographyClassNames = (
  variant: keyof typeof typographyVariants.variants.variant, 
  size: keyof typeof typographyVariants.variants.size 
) => {
  
  const baseClass = typographyVariants.variants.variant[variant] || typographyVariants.defaultVariants.variant;
  const sizeClass = typographyVariants.variants.size[size] || '';

  
  const compoundVariant = typographyVariants.compoundVariants.find(
    (cv) => cv.variant === variant && cv.size === size
  );

  
  return cn(baseClass, sizeClass, compoundVariant?.class);
};

// usage exemple : choose variant, size(optional) and add your own classname(optional)
/*
<Typography variant="h1" size="xxxl" className="underline text-[#3f9a3e]">
  Hello World
</Typography>
*/

const Typography: FC<TypographyProps> = ({ children, className, variant = 'p', size = 'md', as,  ...props }) => {  

  const Element = (as || variant) as keyof JSX.IntrinsicElements;

  return (
    <Element
    className={cn(getTypographyClassNames(variant, size), className, {...props})}
    >
      {children}
    </Element>
  )

  
  
};


export default Typography;