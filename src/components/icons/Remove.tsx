import { FC, HTMLAttributes } from "react";

type RemoveProps = HTMLAttributes<SVGElement>;

const Remove: FC<RemoveProps> = ({ ...props }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_201_2634"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="currentColor" />
      </mask>
      <g mask="url(#mask0_201_2634)">
        <path d="M5.5 12.75V11.25H18.5V12.75H5.5Z" fill="currentColor" />
        <path
          d="M5.5 12.75V11.25H18.5V12.75H5.5Z"
          fill="currentColor"
          fillOpacity="0.2"
        />
        <path
          d="M5.5 12.75V11.25H18.5V12.75H5.5Z"
          fill="currentColor"
          fillOpacity="0.2"
        />
      </g>
    </svg>
  );
};

export default Remove;
