import { FC, ReactNode } from 'react';

const buttonDefaultProps = {
  paddingY: 'py-2',
  width: 'w-full',
};
interface IProps {
  className?: string;
  children: (string | Element)[];
  type?: 'submit' | 'button';
  onClick?: () => any;
}
const Button: FC = ({
  className,
  children,
  type,
  onClick,
  paddingY,
  width,
}: IProps & typeof buttonDefaultProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${
        className && className
      } ${paddingY} ${width} transition-duration hover:opacity-70 text-white focus:outline-none`}
    >
      {children}
    </button>
  );
};

Button.defaultProps = buttonDefaultProps;

export default Button;
