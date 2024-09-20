import { FC, HTMLAttributes } from "react";

type ChevronDownProps = HTMLAttributes<SVGElement>;

const ChevronDown: FC<ChevronDownProps> = ({ ...props }) => {
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
        id="mask0_172_1202"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_172_1202)">
        <path
          d="M12 13.4679L18.7339 6.73394L20 8L12 16L4 8L5.26606 6.73394L12 13.4679Z"
          fill="#151515"
        />
        <path
          d="M12 13.4679L18.7339 6.73394L20 8L12 16L4 8L5.26606 6.73394L12 13.4679Z"
          fill="black"
          fill-opacity="0.2"
        />
        <path
          d="M12 13.4679L18.7339 6.73394L20 8L12 16L4 8L5.26606 6.73394L12 13.4679Z"
          fill="black"
          fill-opacity="0.2"
        />
      </g>
    </svg>
  );
};

export default ChevronDown;
