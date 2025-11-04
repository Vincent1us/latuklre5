"use client";
import Sidebar from "@/components/common/Sidebar";

export default function ReportsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">

      <div className="flex flex-1">
        {/* Sidebar kiri */}
        <aside className="w-64 bg-white">
          <Sidebar />
        </aside>

        {/* Konten utama */}
        <main className="flex-1 p-6">
          <h1 className="text-xl font-semibold mb-4">
            Rekap & Analisis Kehadiran
          </h1>

          {/* Rekap Bulanan */}
          <div className="bg-white p-4 rounded shadow-sm mb-4">
            <h3 className="font-medium">Rekap Bulanan</h3>
            <div className="mt-4">
              <div className="text-sm text-gray-600">Bulan: Oktober 2025</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                <div className="p-4 bg-gray-50 rounded border border-gray-200 shadow-sm">
                  Hadir: <b>20</b>
                </div>
                <div className="p-4 bg-gray-50 rounded border border-gray-200 shadow-sm">
                  Izin: <b>2</b>
                </div>
                <div className="p-4 bg-gray-50 rounded border border-gray-200 shadow-sm">
                  Sakit: <b>1</b>
                </div>
                 <div className="p-4 bg-gray-50 rounded border border-gray-200 shadow-sm">
                  Alpha: <b>0</b>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
