import { FC, HTMLAttributes } from "react";

type ChevronUpProps = HTMLAttributes<SVGElement>;

const ChevronUp: FC<ChevronUpProps> = ({ ...props }) => {
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
        id="mask0_172_1203"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="currentColor" />
      </mask>
      <g mask="url(#mask0_172_1203)">
        <path
          d="M12 9.53212L5.26606 16.2661L4 15L12 7L20 15L18.7339 16.2661L12 9.53212Z"
          fill="currentColor"
        />
        <path
          d="M12 9.53212L5.26606 16.2661L4 15L12 7L20 15L18.7339 16.2661L12 9.53212Z"
          fill="currentColor"
          fillOpacity="0.2"
        />
        <path
          d="M12 9.53212L5.26606 16.2661L4 15L12 7L20 15L18.7339 16.2661L12 9.53212Z"
          fill="currentColor"
          fillOpacity="0.2"
        />
      </g>
    </svg>
  );
};

export default ChevronUp;
