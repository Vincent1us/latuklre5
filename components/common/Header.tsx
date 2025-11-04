"use client";
import React from "react";

export default function Header() {
  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 24px",
      background: "#0b5ed7",
      color: "white",
       borderRadius: "0 0 20px 20px",
        boxShadow: "0 4px 10px rgba(59,130,246,0.25)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 44, height: 48, borderRadius: 10, background: "rgba(255,255,255,0.12)",
          display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 32
        }}>💨</div>
        <div>
          <div style={{ fontWeight: 700 }}>SatSetin</div>
          <div style={{ fontSize: 13, opacity: 0.9 }}>Presensi cepat, tanpa ribet!</div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ fontSize: 14, opacity: 0.95 }}>Senin, 3 November 2025</div>
        <div style={{
          width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.12)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{fontWeight:700}}>VP</span>
        </div>
      </div>
    </header>
  );
}