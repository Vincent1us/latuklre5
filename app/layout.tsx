import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const metadata = {
  title: "Presensi Online",
  description: "Aplikasi Presensi - UI untuk UKL",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
        {/* Header */}
        <Header />

        {/* Konten utama - mendorong footer ke bawah */}
        <main className="flex-1">{children}</main>

        {/* Footer di bawah, tanpa white spot */}
        <Footer />
      </body>
    </html>
  );
}