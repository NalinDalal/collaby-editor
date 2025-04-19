import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "primary" | "secondary" | "ghost";
}

const variantClasses = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-200 text-black hover:bg-gray-300",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100 border",
};

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-xl transition duration-200 font-medium ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};
