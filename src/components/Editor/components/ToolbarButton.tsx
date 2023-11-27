import clsx from "clsx";
import React from "react";

interface Props {
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  label: string;
  className?: string;
}

export default function ToolbarButton({
  children,
  disabled,
  label,
  onClick,
  className,
}: Props) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx("toolbar-item", className)}
      aria-label={label}
    >
      {children}
    </button>
  );
}
