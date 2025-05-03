import React from 'react';
import { Users, Calendar, DollarSign, Map } from 'lucide-react';

export function DashboardStats() {
  const stats = [
    {
      label: 'Total Users',
      value: '24,521',
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      label: 'Active Bookings',
      value: '145',
      change: '+5%',
      icon: Calendar,
      color: 'bg-emerald-500',
    },
    {
      label: 'Revenue',
      value: '$52,000',
      change: '+18%',
      icon: DollarSign,
      color: 'bg-amber-500',
    },
    {
      label: 'Destinations',
      value: '38',
      change: '+2',
      icon: Map,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {stat.value}
              </h3>
              <p className="text-emerald-600 text-sm mt-1">
                {stat.change} this month
              </p>
            </div>
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon size={24} className="text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;