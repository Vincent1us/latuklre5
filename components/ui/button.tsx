"use client";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export default function Button({ children, variant = "primary", ...rest }: ButtonProps) {
  const base: React.CSSProperties = {
    padding: "10px 16px",
    borderRadius: 10,
    border: "none",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(2,6,23,0.06)",
  };
  const primary: React.CSSProperties = {
    backgroundColor: "#0b5ed7",
    color: "white",
  };
  const ghost: React.CSSProperties = {
    backgroundColor: "transparent",
    color: "#0b5ed7",
    border: "1px solid rgba(11,94,215,0.12)",
  };
  return (
    <button style={{ ...base, ...(variant === "primary" ? primary : ghost) }} {...rest}>
      {children}
    </button>
  );
}