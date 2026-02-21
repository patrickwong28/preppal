interface BookmarkIconProps {
  className: string;
  filled: boolean;
  onClick: () => void;
}

export default function BookmarkIcon({
  className,
  filled,
  onClick,
}: BookmarkIconProps) {
  return (
    <svg
      viewBox="0 0 1920 1920"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        d="M505.586 0C411.536 0 335 76.536 335 170.586V1920l625.48-375.289L1585.963 1920V170.586C1585.963 76.536 1509.427 0 1415.377 0H505.586Z"
        fill={filled ? "currentColor" : "none"}
        stroke="gray"
        strokeWidth={60}
      />
    </svg>
  );
}
