import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DashboardStats } from '../../components/admin/dashboard/DashboardStats';
import { RecentBookings } from '../../components/admin/dashboard/RecentBookings';

export function Dashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex space-x-4">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition">
              Download Report
            </button>
          </div>
        </div>
        <DashboardStats />
        <RecentBookings />
      </div>
    </AdminLayout>
  );
}

export default Dashboard;