"use client";
import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: Props) {
  return (
    <input
      {...props}
      style={{
        padding: "10px 12px",
        borderRadius: 8,
        border: "1px solid #e2e8f0",
        width: "100%",
        boxSizing: "border-box",
        fontSize: 14,
      }}
    />
  );
}