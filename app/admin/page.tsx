// app/admin/page.tsx
import React from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/features/auth/authOptions";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/unauthorized");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Admin Dashboard
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Kullanıcı Yönetimi</h3>
              <p className="text-blue-700 text-sm">
                Kullanıcı hesaplarını görüntüle ve yönet
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Sistem Durumu</h3>
              <p className="text-green-700 text-sm">
                Uygulama performansını ve durumunu izle
              </p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Güvenlik Logları</h3>
              <p className="text-purple-700 text-sm">
                Güvenlik olaylarını ve erişim loglarını incele
              </p>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Hoş Geldin, {session.user.name}!</h3>
            <p className="text-gray-600 text-sm">
              Admin yetkilerinizle sistem yönetimi yapabilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}