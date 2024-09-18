import { FC, ReactNode } from 'react';

type ButtonProps = {
  size?: 'small' | 'medium' | 'large';
  variant?: 'blue' | 'white' | 'lightBlue' | 'grey';
  children?: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

const Button: FC<ButtonProps> = ({ size, onClick, variant, children, className, ...props }) => {

  
  const sizes = () => {
    switch (size) {
      case 'small':
        return 'px-4 py-2 text-sm';
      case 'medium':
        return 'px-6 py-3 text-base';
      case 'large':
        return 'px-8 py-4 text-lg';
      default:
        return '';
    }
  };

  
  const colors = () => {
    switch (variant) {
      case 'blue':
        return 'bg-[#112f5f] rounded-[100px] text-white';
      case 'white':
        return 'bg-none border border-[#112f5f] rounded-[100px] text-[#112f5f]';
      case 'lightBlue':
        return 'bg-[#488AC6] rounded-[100px] text-white';
      case 'grey':
        return 'text-[#6C757D] bg-[#F1F1F1] rounded-[100px]';
      default:
        return '';
    }
  };

  return (
    <button
      className={`${sizes()} ${colors()} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
