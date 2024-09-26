import { FC, useRef, useState } from "react";
import Calendar from "./Calendar";
import { format } from "date-fns";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

type DatePickerProps = {
  selected: Date | undefined;
  // setSelected: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setSelected: (date: Date | undefined) => void;
};

const DatePicker: FC<DatePickerProps> = ({ selected, setSelected }) => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setShow(false));
  useEventListener("keyup", (ev) => {
    if (ev.key === "Escape" && show) {
      ev.preventDefault();
      setShow(false);
    }
  });

  return (
    <div className="relative">
      <div
        onClick={() => setShow((prev) => !prev)}
        className="py-2 px-4 border border-[#E2E2E2] rounded-md bg-[#F9F9F9] text-[#495057] cursor-pointer"
      >
        {selected ? format(selected, "yy.MM.dd") : "Välj ett datum"}
      </div>
      {show && (
        <div className="absolute top-full mt-2 z-[99]" ref={ref}>
          <Calendar selected={selected} onSelect={setSelected} mode="single" />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
