import React from 'react';

function DashboardCard07() {
  return (
    <div className="col-span-full xl:col-span-8 bg-white shadow-md rounded-2xl">
      <header className="px-5 py-4 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800">Top Friends</h2>
      </header>
      <div className="p-5">
        <div className="overflow-x-auto">
        <div className="max-h-80 overflow-y-auto"> {/* 👈 NEW WRAPPER for vertical scroll */}
          <table className="table-auto w-full text-slate-700">
            <thead className="text-xs uppercase text-slate-400 bg-slate-50">
              <tr>
                <th className="p-2 text-left font-semibold">Friend</th>
                <th className="p-2 text-center font-semibold">Product</th>
                <th className="p-2 text-center font-semibold">Order</th>
                <th className="p-2 text-center font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {/* Each Row */}
              {[
                {
                  name: 'Amit Singh',
                  icon: ['#6366F1', '#FFF'],
                  path: '',
                  product: 'Sonata Watch',
                  order: 'ORD123456',
                  date: 'May 1, 2025',
                },
                {
                  name: 'Sneha Patel',
                  icon: ['#F59E0B', '#FFF'],
                  path: '',
                  product: 'OnePlus Nord',
                  order: 'ORD123457',
                  date: 'Apr 23, 2025',
                },
                {
                  name: 'Rohan Mehta',
                  icon: ['#10B981', '#FFF'],
                  path: '',
                  product: 'Noise Smartwatch',
                  order: 'ORD123458',
                  date: 'Apr 15, 2025',
                },
                {
                  name: 'Kavita Nair',
                  icon: ['#8B5CF6', '#FFF'],
                  path: '',
                  product: 'Summer Top',
                  order: 'ORD123459',
                  date: 'Mar 30, 2025',
                },
                {
                  name: 'Jay Verma',
                  icon: ['#EC4899', '#FFF'],
                  path: '',
                  product: 'Pigeon Kettle',
                  order: 'ORD123460',
                  date: 'Mar 28, 2025',
                },
                {
                  name: 'Anjali Roy',
                  icon: ['#3B82F6', '#FFF'],
                  path: '',
                  product: 'Saree Combo',
                  order: 'ORD123461',
                  date: 'Mar 20, 2025',
                },
                {
                  name: 'Neeraj Kumar',
                  icon: ['#F43F5E', '#FFF'],
                  path: '',
                  product: 'Electric Iron',
                  order: 'ORD123462',
                  date: 'Mar 15, 2025',
                },
                {
                  name: 'Priya Sharma',
                  icon: ['#14B8A6', '#FFF'],
                  path: '',
                  product: 'Bluetooth Speaker',
                  order: 'ORD123463',
                  date: 'Mar 10, 2025',
                },
                {
                  name: 'Harshit Gupta',
                  icon: ['#A855F7', '#FFF'],
                  path: '',
                  product: 'Gaming Mouse',
                  order: 'ORD123464',
                  date: 'Feb 25, 2025',
                },
                {
                  name: 'Mitali Das',
                  icon: ['#F97316', '#FFF'],
                  path: '',
                  product: 'Yoga Mat',
                  order: 'ORD123465',
                  date: 'Feb 14, 2025',
                },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="p-2">
                    <div className="flex items-center">
                      <svg className="shrink-0 mr-3" width="36" height="36" viewBox="0 0 36 36">
                        <circle fill={row.icon[0]} cx="18" cy="18" r="18" />
                        <path d={row.path} fill={row.icon[1]} />
                      </svg>
                      <div className="text-slate-800">{row.name}</div>
                    </div>
                  </td>
                  <td className="p-2 text-center">{row.product}</td>
                  <td className="p-2 text-center text-emerald-500">{row.order}</td>
                  <td className="p-2 text-center">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
