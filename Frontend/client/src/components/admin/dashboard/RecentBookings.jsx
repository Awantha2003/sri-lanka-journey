import React from 'react';

export function RecentBookings() {
  const bookings = [
    {
      id: '#12345',
      customer: 'John Smith',
      destination: 'Sigiriya Rock Fortress',
      date: '2024-02-15',
      amount: '$250',
      status: 'confirmed',
    },
    {
      id: '#12346',
      customer: 'Emma Wilson',
      destination: 'Yala Safari',
      date: '2024-02-16',
      amount: '$175',
      status: 'pending',
    },
    {
      id: '#12347',
      customer: 'Michael Brown',
      destination: 'Kandy City Tour',
      date: '2024-02-17',
      amount: '$120',
      status: 'cancelled',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-emerald-100 text-emerald-700';
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Recent Bookings</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              {['Booking ID', 'Customer', 'Destination', 'Date', 'Amount', 'Status'].map((heading) => (
                <th
                  key={heading}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-500">{booking.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{booking.customer}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{booking.destination}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{booking.date}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{booking.amount}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentBookings;