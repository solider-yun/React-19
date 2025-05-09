import React from "react";

type Variant = "h1" | "h2" | "h3" | "body" | "caption";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

const variantMap: Record<Variant, string> = {
  h1: "text-4xl font-bold",
  h2: "text-3xl font-semibold",
  h3: "text-2xl font-medium",
  body: "text-base",
  caption: "text-sm text-gray-500",
};

const Typography: React.FC<TypographyProps> = ({
  variant = "body",
  className = "",
  children,
  ...props
}) => {
  const Component = variant.startsWith("h") ? variant : "p";
  return React.createElement(
    Component,
    {
      className: `${variantMap[variant]} ${className}`,
      ...props,
    },
    children
  );
};

export default Typography;
