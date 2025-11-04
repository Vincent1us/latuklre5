"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const handleLogin = () => {
    alert("Login berhasil (demo). Arahkan ke /main/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #dbeafe, #eff6ff)",
        padding: "32px 16px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: 880,
          background: "white",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(43, 110, 242, 0.15)",
        }}
      >
        {/* LEFT SECTION (Brand Info) */}
        <div
          style={{
            flex: 1,
            background: "linear-gradient(135deg, #60a5fa, #2b6ef2)",
            color: "white",
            padding: 40,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 18,
          }}
        >
          <h1 style={{ fontSize: 35, fontWeight: 700 }}>Presensi Sekolah</h1>
          <p style={{ opacity: 0.95, lineHeight: 1.6 }}>
            Sistem presensi online yang membantu proses presensi lebih mudah dan cepat.
          </p>
          <div
            style={{
              marginTop: 16,
              background: "rgba(255,255,255,0.2)",
              padding: "12px 16px",
              borderRadius: 10,
              fontSize: 14,
            }}
          >
            "Disiplin adalah kunci kesuksesan"
          </div>
        </div>

        {/* RIGHT SECTION (Form) */}
        <div
          style={{
            flex: 1,
            padding: 48,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              fontWeight: 700,
              fontSize: 24,
              color: "#1e3a8a",
              marginBottom: 6,
            }}
          >
            Selamat Datang
          </h2>
          <p style={{ color: "#6b7280", marginBottom: 28 }}>
           Jangan Lupa Isi Username dan Password
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Input
              placeholder="Username / NIS"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {/* PASSWORD WITH SHOW/HIDE */}
            <div style={{ position: "relative" }}>
              <Input
                placeholder="Password"
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPwd(!showPwd)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  fontSize: 13,
                  color: "#2b6ef2",
                  fontWeight: 500,
                }}
              >
                {showPwd ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          <Button
            onClick={handleLogin}
            style={{
              width: "100%",
              marginTop: 28,
              height: 46,
              fontSize: 16,
              fontWeight: 600,
              backgroundColor: "#2b6ef2",
              color: "white",
              borderRadius: 12,
              boxShadow: "0 4px 14px rgba(43, 110, 242, 0.35)",
              transition: "all 0.25s ease",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1e5be0";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#2b6ef2";
            }}
          >
            Login Sekarang
          </Button>

          <p
            style={{
              fontSize: 13,
              color: "#9ca3af",
              marginTop: 18,
              textAlign: "center",
            }}
          >
          </p>
        </div>
      </div>
    </div>
  );
}