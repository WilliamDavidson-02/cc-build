import { FC, HTMLAttributes } from "react";

type CloseProps = HTMLAttributes<SVGElement>;

const Close: FC<CloseProps> = ({ ...props }) => {
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
        id="mask0_341_2096"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="currentColor" />
      </mask>
      <g mask="url(#mask0_341_2096)">
        <path
          d="M6.40043 18.6537L5.34668 17.5999L10.9467 11.9999L5.34668 6.39994L6.40043 5.34619L12.0004 10.9462L17.6004 5.34619L18.6542 6.39994L13.0542 11.9999L18.6542 17.5999L17.6004 18.6537L12.0004 13.0537L6.40043 18.6537Z"
          fill="currentColor"
        />
        <path
          d="M6.40043 18.6537L5.34668 17.5999L10.9467 11.9999L5.34668 6.39994L6.40043 5.34619L12.0004 10.9462L17.6004 5.34619L18.6542 6.39994L13.0542 11.9999L18.6542 17.5999L17.6004 18.6537L12.0004 13.0537L6.40043 18.6537Z"
          fill="currentColor"
          fillOpacity="0.2"
        />
        <path
          d="M6.40043 18.6537L5.34668 17.5999L10.9467 11.9999L5.34668 6.39994L6.40043 5.34619L12.0004 10.9462L17.6004 5.34619L18.6542 6.39994L13.0542 11.9999L18.6542 17.5999L17.6004 18.6537L12.0004 13.0537L6.40043 18.6537Z"
          fill="currentColor"
          fillOpacity="0.2"
        />
      </g>
    </svg>
  );
};

export default Close;
