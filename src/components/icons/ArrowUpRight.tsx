import { FC, HTMLAttributes } from "react";

type ArrowUpRightProps = HTMLAttributes<SVGElement>;

const ArrowUpRight: FC<ArrowUpRightProps> = ({ ...props }) => {
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
        id="mask0_341_2089"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_341_2089)">
        <path
          d="M6.29425 17.6443L5.25 16.6L15.0905 6.75H6.14425V5.25H17.6443V16.75H16.1443V7.80375L6.29425 17.6443Z"
          fill="#151515"
        />
        <path
          d="M6.29425 17.6443L5.25 16.6L15.0905 6.75H6.14425V5.25H17.6443V16.75H16.1443V7.80375L6.29425 17.6443Z"
          fill="black"
          fillOpacity="0.2"
        />
        <path
          d="M6.29425 17.6443L5.25 16.6L15.0905 6.75H6.14425V5.25H17.6443V16.75H16.1443V7.80375L6.29425 17.6443Z"
          fill="black"
          fillOpacity="0.2"
        />
      </g>
    </svg>
  );
};

export default ArrowUpRight;
