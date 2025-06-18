import React from 'react';

function DashboardCard07() {
  return (
    <div className="col-span-full xl:col-span-8 bg-white shadow-md rounded-2xl">
      <header className="px-5 py-4 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800">Top Channels</h2>
      </header>
      <div className="p-5">
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-slate-700">
            <thead className="text-xs uppercase text-slate-400 bg-slate-50">
              <tr>
                <th className="p-2 text-left font-semibold">Source</th>
                <th className="p-2 text-center font-semibold">Visitors</th>
                <th className="p-2 text-center font-semibold">Revenues</th>
                <th className="p-2 text-center font-semibold">Sales</th>
                <th className="p-2 text-center font-semibold">Conversion</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {/* Each Row */}
              {[
                {
                  name: 'Github.com',
                  icon: ['#24292E', '#FFF'],
                  path: 'M18 10.2c-4.4 0-8 3.6-8 8...',
                  visitors: '2.4K',
                  revenue: '$3,877',
                  sales: '267',
                  conversion: '4.7%',
                },
                {
                  name: 'Facebook',
                  icon: ['#1877F2', '#FFF'],
                  path: 'M16.023 26 16 19h-3v-3h3v-2c0-2.7...',
                  visitors: '2.2K',
                  revenue: '$3,426',
                  sales: '249',
                  conversion: '4.4%',
                },
                {
                  name: 'Google (organic)',
                  icon: ['#EA4335', '#FFF'],
                  path: 'M18 17v2.4h4.1c-.2 1-1.2 3-4 3...',
                  visitors: '2.0K',
                  revenue: '$2,444',
                  sales: '224',
                  conversion: '4.2%',
                },
                {
                  name: 'Vimeo.com',
                  icon: ['#4BC9FF', '#FFF'],
                  path: 'M26 14.3c-.1 1.6-1.2 3.7-3.3 6.4...',
                  visitors: '1.9K',
                  revenue: '$2,236',
                  sales: '220',
                  conversion: '4.2%',
                },
                {
                  name: 'Indiehackers.com',
                  icon: ['#0E2439', '#E6ECF4'],
                  path: 'M14.232 12.818V23H11.77V12.818h2.46...',
                  visitors: '1.7K',
                  revenue: '$2,034',
                  sales: '204',
                  conversion: '3.9%',
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
                  <td className="p-2 text-center">{row.visitors}</td>
                  <td className="p-2 text-center text-emerald-500">{row.revenue}</td>
                  <td className="p-2 text-center">{row.sales}</td>
                  <td className="p-2 text-center text-sky-500">{row.conversion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
