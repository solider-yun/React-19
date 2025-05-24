import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
};

const baseStyle: React.CSSProperties = {
  padding: "8px 16px",
  borderRadius: "8px",
  color: "white",
  fontWeight: 600,
  transition: "background-color 0.2s",
  border: "none",
  cursor: "pointer",
};

const variantStyles: Record<
  NonNullable<ButtonProps["variant"]>,
  React.CSSProperties
> = {
  primary: {
    backgroundColor: "#2563eb", // blue-600
  },
  secondary: {
    backgroundColor: "#4b5563", // gray-600
  },
  danger: {
    backgroundColor: "#dc2626", // red-600
  },
};

const disabledStyle: React.CSSProperties = {
  opacity: 0.5,
  cursor: "not-allowed",
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  style,
  type = "button",
}) => {
  const finalStyle: React.CSSProperties = {
    ...baseStyle,
    ...variantStyles[variant],
    ...(disabled ? disabledStyle : {}),
    ...style, // override from props
  };

  return (
    <button
      type={type}
      onClick={onClick}
      style={finalStyle}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
