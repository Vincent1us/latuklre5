"use client";
import React from "react";

export default function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: "white",
      padding: 16,
      borderRadius: 12,
      boxShadow: "0 6px 18px rgba(2,6,23,0.06)",
      ...style
    }}>
      {children}
    </div>
  );
}