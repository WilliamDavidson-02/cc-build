import { FC, HTMLAttributes } from "react";

type ChevronRightProps = HTMLAttributes<SVGElement>;

const ChevronRight: FC<ChevronRightProps> = ({ ...props }) => {
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
        id="mask0_172_1200"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="-1"
        y="-1"
        width="25"
        height="25"
      >
        <rect
          x="-0.292969"
          y="-0.36792"
          width="24"
          height="24"
          fill="currentColor"
        />
      </mask>
      <g mask="url(#mask0_172_1200)">
        <path
          d="M13.4394 11.6367L6.70703 4.89513L7.97008 3.63208L15.9655 11.6367L7.97008 19.6321L6.70703 18.369L13.4394 11.6367Z"
          fill="currentColor"
        />
        <path
          d="M13.4394 11.6367L6.70703 4.89513L7.97008 3.63208L15.9655 11.6367L7.97008 19.6321L6.70703 18.369L13.4394 11.6367Z"
          fill="currentColor"
          fillOpacity="0.2"
        />
        <path
          d="M13.4394 11.6367L6.70703 4.89513L7.97008 3.63208L15.9655 11.6367L7.97008 19.6321L6.70703 18.369L13.4394 11.6367Z"
          fill="currentColor"
          fillOpacity="0.2"
        />
      </g>
    </svg>
  );
};

export default ChevronRight;
