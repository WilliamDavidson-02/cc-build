import { FC, ChangeEvent } from "react";

type RadiobuttonProps = {
  measurement: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Radiobutton: FC<RadiobuttonProps> = ({
  measurement,
  name,
  value,
  checked,
  onChange,
}) => {
  return (
    <>
      <div className="flex gap-2 items-center ">
        <label htmlFor={measurement}>{measurement}</label>
        <input
          type="radio"
          id={measurement}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default Radiobutton;
