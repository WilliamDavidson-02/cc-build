import { FC, HTMLAttributes } from "react";

type CheckProps = HTMLAttributes<SVGElement>;

const Check: FC<CheckProps> = ({ ...props }) => {
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
        id="mask0_194_236"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_194_236)">
        <path
          d="M9.71094 15.3557L6.35547 12.0002L7.31697 11.0387L9.71094 13.4327L15.7879 7.35571L16.7494 8.31721L9.71094 15.3557Z"
          fill="#1C1B1F"
        />
      </g>
    </svg>
  );
};

export default Check;
