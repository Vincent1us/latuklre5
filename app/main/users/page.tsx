"use client";
import Sidebar from "@/components/common/Sidebar";
import { useState } from "react";
import { users as initialUsers, User } from "@/lib/mock";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);

  const [form, setForm] = useState({ nis: "", name: "", kelas: "", role: "siswa" });

  function openAdd() {
    setEditing(null);
    setForm({ nis: "", name: "", kelas: "", role: "siswa" });
    setShowForm(true);
  }

  function openEdit(u: User) {
    setEditing(u);
    setForm({ nis: u.nis, name: u.name, kelas: u.kelas, role: u.role ?? "siswa" });
    setShowForm(true);
  }

  function save() {
    if (editing) {
      setUsers((prev) => prev.map((p) => (p.id === editing.id ? { ...p, ...form } : p)));
    } else {
      setUsers((prev) => [...prev, { ...form, id: uuidv4() } as User]);
    }
    setShowForm(false);
  }

  function remove(id: string) {
    setUsers((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar nempel kiri */}
      <div className="w-64">
        <Sidebar />
      </div>

      {/* Konten utama */}
      <div className="flex-1 flex flex-col">
        {/* Isi utama */}
        <main className="flex-1 p-6 pb-16">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold">Data Pengguna</h1>
            <Button onClick={openAdd}>Tambah Pengguna</Button>
          </div>

          <div className="bg-white rounded shadow overflow-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left">NIS</th>
                  <th className="p-3 text-left">Nama</th>
                  <th className="p-3 text-left">Kelas</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b">
                    <td className="p-3">{u.nis}</td>
                    <td className="p-3">{u.name}</td>
                    <td className="p-3">{u.kelas}</td>
                    <td className="p-3">{u.role}</td>
                    <td className="p-3 text-center">
                      <button
                        className="mr-2 text-blue-600 hover:underline"
                        onClick={() => openEdit(u)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => remove(u.id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Modal Tambah/Edit */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h3 className="font-semibold mb-3">
              {editing ? "Edit Pengguna" : "Tambah Pengguna"}
            </h3>
            <Input
              placeholder="NIS"
              value={form.nis}
              onChange={(e) => setForm({ ...form, nis: e.target.value })}
            />
            <Input
              placeholder="Nama"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              placeholder="Kelas"
              value={form.kelas}
              onChange={(e) => setForm({ ...form, kelas: e.target.value })}
            />
            <div className="flex gap-2 mt-3">
              <Button onClick={save}>{editing ? "Simpan" : "Tambah"}</Button>
              <button
                className="px-4 py-2 border rounded"
                onClick={() => setShowForm(false)}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
