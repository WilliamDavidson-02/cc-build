import { FC } from "react";

type RadiobuttonProps = { measurement: string; name: string };

const Radiobutton: FC<RadiobuttonProps> = ({ measurement, name }) => {
  return (
    <>
      <div className="flex gap-2 items-center ">
        <label htmlFor={measurement}>{measurement}</label>
        <input type="radio" id={measurement} name={name} value={measurement} />
      </div>
    </>
  );
};

export default Radiobutton;
