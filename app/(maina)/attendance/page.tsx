"use client";

import Sidebar from "@/components/common/Sidebar";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getAttendanceHistoryByUser, recordAttendance } from "@/lib/mock";

export default function AttendancePage() {
  const currentUser = "u1";
  const [history, setHistory] = useState<any[]>([]);
  const [todayStatus, setTodayStatus] = useState<string | null>(null);

  async function load() {
    const h = await getAttendanceHistoryByUser(currentUser);
    setHistory(h);

    const today = new Date().toISOString().slice(0, 10);
    const todayRecord = h.find((x) => x.dateISO === today);
    if (todayRecord) setTodayStatus(todayRecord.status);
  }

  useEffect(() => {
    load();
  }, []);

  const doPresensi = async (status: string) => {
    const mapStatus: Record<string, "present" | "sick" | "permit" | "alpha"> = {
      hadir: "present",
      sakit: "sick",
      izin: "permit",
      alpha: "alpha",
    };

    const converted = mapStatus[status] || "present";
    await recordAttendance(currentUser, converted);
    setTodayStatus(status);
    await load();
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar kiri */}
      <div className="w-64">
        <Sidebar active="attendance" />
      </div>

      {/* Konten utama */}
      <div className="flex-1 flex flex-col">
        <main className="p-6">
          <div className="flex gap-6">
            <div className="flex-1 space-y-4">
              {/* PRESENSI HARI INI */}
              <Card>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-800">Presensi Hari Ini</h3>
                    <p className="text-sm text-gray-500">
                      Status:{" "}
                      <span className="font-medium text-blue-600">
                        {todayStatus
                          ? todayStatus === "present"
                            ? "Hadir"
                            : todayStatus === "sick"
                            ? "Sakit"
                            : todayStatus === "permit"
                            ? "Izin"
                            : "Alpha"
                          : "Belum presensi"}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => doPresensi("hadir")}>Hadir</Button>
                    <Button onClick={() => doPresensi("izin")} variant="ghost">
                      Izin
                    </Button>
                    <Button onClick={() => doPresensi("sakit")} variant="ghost">
                      Sakit
                    </Button>
                    <Button onClick={() => doPresensi("alpha")} variant="ghost">
                      Alpha
                    </Button>
                  </div>
                </div>
              </Card>

              {/* RIWAYAT PRESENSI */}
              <Card>
                <h4 className="font-semibold mb-3 text-gray-800">Riwayat Presensi</h4>
                {history.length === 0 && (
                  <div className="text-gray-500 text-sm">Belum ada catatan</div>
                )}
                <ul className="text-sm divide-y">
                  {history.map((h) => (
                    <li key={h.id} className="py-2 flex justify-between">
                      <span>{h.dateISO}</span>
                      <span className="capitalize">
                        {h.status === "present"
                          ? "Hadir"
                          : h.status === "sick"
                          ? "Sakit"
                          : h.status === "permit"
                          ? "Izin"
                          : "Alpha"}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Informasi Pengguna */}
            <div className="w-80">
              <Card>
                <h4 className="font-bold text-gray-900 mb-2">Informasi Pengguna</h4>
                <div className="text-gray-700">Nama: Vincentius Ferrer</div>
                <div className="text-gray-700">Kelas: XI RPL 5</div>
                <div className="text-gray-700">NISN: 1234567890</div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
