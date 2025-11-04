"use client";
import React from "react";
import Link from "next/link";

export default function Sidebar({ active = "dashboard" }: { active?: string }) {
  const menu = [
    { id: "dashboard", label: "Home", href: "/dashboard" },
    { id: "attendance", label: "Presensi", href: "/attendance" },
    { id: "users", label: "User Management", href: "/main/users" },
    { id: "analytics", label: "Rekap & Analytics", href: "/analytics" },
  ];

  const mainBlue = "#0b5ed7";
  const grayText = "#6b7280";

  return (
    <aside style={{ width: 260, padding: 18 }}>
      <div style={{ textAlign: "center", padding: "10px 0" }}>
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            backgroundImage: 'url("biru.jpg")',  
            margin: "0 auto 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 700,
            fontSize: 50,
          }}
        >
        💻
        </div>
        <div style={{ fontWeight: 700 }}>Vincentius Ferrer Pioraka</div>
        <div style={{ fontSize: 13, color: "#4b5563" }}>Kelas: Serealima</div>
      </div>

      {/* MENU */}
      <nav
        style={{
          marginTop: 18,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {menu.map((m) => (
          <Link
            key={m.id}
            href={m.href}
            style={{
              padding: "10px 12px",
              borderRadius: 8,
              textDecoration: "none",
              display: "block",
              fontWeight: 600,
              color: active === m.id ? mainBlue : grayText,
              background: "transparent",
              transition: "color 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = mainBlue;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color =
                active === m.id ? mainBlue : grayText;
            }}
          >
            {m.label}
          </Link>
        ))}
      </nav>

      {/* Tombol Sign Out */}
      <div style={{ marginTop: 24 }}>
        <button
          style={{
            width: "100%",
            padding: "10px 12px",
            background: "white",
            color: mainBlue,
            border: `2px solid ${mainBlue}`,
            borderRadius: 8,
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = mainBlue;
            e.currentTarget.style.color = "white";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "white";
            e.currentTarget.style.color = mainBlue;
          }}
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
