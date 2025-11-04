"use client";

import Sidebar from "@/components/common/Sidebar";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getUserById, getMonthlySummary, getAllAttendance, getUsers, recordAttendance } from "@/lib/mock";

export default function DashboardPage() {
  const [summary, setSummary] = useState<any>(null);
  const [presencePercent, setPresencePercent] = useState(0);
  const [topList, setTopList] = useState<any[]>([]);
  const userId = "u1";

  useEffect(() => {
    async function load() {
      const s = await getMonthlySummary(userId, "2025-11");
      setSummary(s);

      const all = await getAllAttendance();
      const total = all.filter(a => a.dateISO.startsWith("2025-11")).length || 1;
      const present = all.filter(a => a.dateISO.startsWith("2025-11") && a.status === "present").length;
      setPresencePercent(Math.round((present / total) * 100));

      const latest = all.sort((a,b)=> (b.dateISO + b.time).localeCompare(a.dateISO + a.time)).slice(0,10);
      const users = await getUsers();
      const enriched = latest.map(l => ({ ...l, user: users.find(u=>u.id===l.userId) }));
      setTopList(enriched);
    }
    load();
  }, []);

  const handlePresensi = async () => {
    await recordAttendance(userId, "present");
    alert("Presensi tersimpan (demo).");
    // refresh simple
    const s = await getMonthlySummary(userId, "2025-11");
    setSummary(s);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", gap: 20, background: "#f3f6fb" }}>
      <Sidebar active="dashboard" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      
        <main style={{ padding: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 18 }}>
            <div>
              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 12, color: "#374151" }}>Status</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "#0b5ed7" }}>
                      {summary ? (summary.present > 0 ? "Present Today" : "Not Present") : "Not Present"}
                    </div>
                  </div>
                  <div>
                    <Button onClick={handlePresensi}>Catat Presensi Hari Ini</Button>
                  </div>
                </div>
              </Card>

              <div style={{ height: 16 }} />

              <Card>
                <h3 style={{ marginTop: 0 }}>Riwayat Presensi Terbaru</h3>
                <ul style={{ margin: 0, paddingLeft: 16 }}>
                  {topList.map(item => (
                    <li key={item.id} style={{ marginBottom: 8 }}>
                      <div style={{ fontWeight: 700 }}>{item.user?.name || "Unknown"}</div>
                      <div style={{ fontSize: 13, color: "#6b7280" }}>{item.dateISO} • {item.time} — {item.status}</div>
                    </li>
                  ))}
                  {topList.length === 0 && <li style={{ color: "#6b7280" }}>No data</li>}
                </ul>
              </Card>

            </div>

            <div>
              <Card style={{ marginBottom: 12 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 14, color: "#6b7280" }}>Present Percentage</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#0b5ed7" }}>{presencePercent}%</div>
                </div>
                <hr style={{ margin: "12px 0" }} />
                <div style={{ display: "grid", gap: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>On Duty</div><div>1</div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>Sick</div><div>9</div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>Permit</div><div>9</div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>Alpha</div><div>2</div>
                  </div>
                </div>
              </Card>

              <Card>
                <h4 style={{ marginTop: 0 }}>TOP 10 ATTENDANCE</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {topList.map((t, idx) => (
                    <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 6px", borderRadius: 8 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <div style={{ width: 36, height: 36, borderRadius: 8, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>👤</div>
                        <div>
                          <div style={{ fontWeight: 700 }}>{t.user?.name || "Unknown"}</div>
                          <div style={{ fontSize: 12, color: "#6b7280" }}>{t.time}</div>
                        </div>
                      </div>
                      <div style={{ color: "#ef4444", fontWeight: 800 }}>{idx + 1}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}