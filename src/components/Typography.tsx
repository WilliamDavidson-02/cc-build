import React from 'react';
import { FC } from 'react';

type TypographyProps = {
  children: React.ReactNode
  className?: string
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  size?: 'sm' | 'md' | 'lg'
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
};


// EXAMPLE USAGE:
/*
<Typography component="h1" size="lg" className="text-blue-500">
  This is a large H1 heading
</Typography>

USING THE 'as' PROP:
<Typography component="h1" as="h3" className="text-blue-500" size="md">
  This is an H1 tag styled as an H3
</Typography>

*/


const Typography: FC<TypographyProps> = ({ children, className, component = 'p', size, as, ...props }) => {  

  const styledComponent = as || component;


  const sizes = () => {
    switch (size) {
      case 'sm':
        return 'text-sm';
      case 'md':
        return 'text-base';
      case 'lg':
        return 'text-lg';
      default:
        return '';
    }
  };

  const variants = () => {
    switch (styledComponent) {
      case 'h1':
        return 'text-4xl font-bold';
      case 'h2':
        return 'text-3xl font-bold';
      case 'h3':
        return 'text-2xl font-bold';
      case 'h4':
        return 'text-xl font-bold';
      case 'h5':
        return 'text-lg font-bold';
      case 'h6':
        return 'text-base font-bold';
      case 'p':
        return 'text-base';
      default:
        return '';
    }
  }

  return React.createElement(
    component,  
    { className: `${sizes()} ${variants()} ${className}`, ...props },  
    children  
  );
};


export default Typography;