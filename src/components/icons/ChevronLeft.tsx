import { FC, HTMLAttributes } from "react";

type ChevronLeftProps = HTMLAttributes<SVGElement>;

const ChevronLeft: FC<ChevronLeftProps> = ({ ...props }) => {
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
        id="mask0_172_1201"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_172_1201)">
        <path
          d="M14.9954 20L7 12.0046L14.9954 4L16.2585 5.26305L9.52609 12.0046L16.2585 18.737L14.9954 20Z"
          fill="#151515"
        />
        <path
          d="M14.9954 20L7 12.0046L14.9954 4L16.2585 5.26305L9.52609 12.0046L16.2585 18.737L14.9954 20Z"
          fill="black"
          fill-opacity="0.2"
        />
        <path
          d="M14.9954 20L7 12.0046L14.9954 4L16.2585 5.26305L9.52609 12.0046L16.2585 18.737L14.9954 20Z"
          fill="black"
          fill-opacity="0.2"
        />
      </g>
    </svg>
  );
};

export default ChevronLeft;
