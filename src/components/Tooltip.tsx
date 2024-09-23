import { FC, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import Info from "./icons/Info";
import Typography from "./Typography";

type TooltipProps = {
  info: string;
};

export const Tooltip: FC<TooltipProps> = ({ info }) => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setShow(false));

  return (
    <div className="relative w-fit">
      <div
        ref={ref}
        onClick={() => setShow((prev) => !prev)}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="w-fit"
      >
        <Info />
      </div>
      {show && (
        <div className="absolute left-full top-0 ml-1 z-50 bg-mercury py-1 px-2 w-max max-w-lg">
          <Typography size="sm">{info}</Typography>
        </div>
      )}
    </div>
  );
};