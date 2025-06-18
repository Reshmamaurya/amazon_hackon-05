import React from 'react';
import DoughnutChart from '../../charts/DoughnutChart';
import { getCssVariable } from '../../utils/Utils';

function DashboardCard06() {
  const chartData = {
    labels: ['United States', 'Italy', 'Other'],
    datasets: [
      {
        label: 'Top Countries',
        data: [35, 30, 35],
        backgroundColor: [
          getCssVariable('--color-violet-500'),
          getCssVariable('--color-sky-500'),
          getCssVariable('--color-violet-800'),
        ],
        hoverBackgroundColor: [
          getCssVariable('--color-violet-600'),
          getCssVariable('--color-sky-600'),
          getCssVariable('--color-violet-900'),
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-md rounded-2xl">
      <header className="px-5 py-4 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800">Top Countries</h2>
      </header>
      <div className="p-5">
        <DoughnutChart data={chartData} width={389} height={260} />
      </div>
    </div>
  );
}

export default DashboardCard06;
