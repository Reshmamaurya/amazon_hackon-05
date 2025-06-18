import React from 'react';
import BarChart from '../../charts/BarChart01';
import { getCssVariable } from '../../utils/Utils';

function DashboardCard04() {
  const chartData = {
    labels: [
      '12-01-2022', '01-01-2023', '02-01-2023',
      '03-01-2023', '04-01-2023', '05-01-2023',
    ],
    datasets: [
      {
        label: 'Direct',
        data: [800, 1600, 900, 1300, 1950, 1700],
        backgroundColor: getCssVariable('--color-sky-500'),
        hoverBackgroundColor: getCssVariable('--color-sky-600'),
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
      {
        label: 'Indirect',
        data: [4900, 2600, 5350, 4800, 5200, 4800],
        backgroundColor: getCssVariable('--color-violet-500'),
        hoverBackgroundColor: getCssVariable('--color-violet-600'),
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-md rounded-2xl p-5 text-slate-900 h-[320px]">
      {/* Header */}
      <div className="mb-2">
        <h2 className="text-lg font-semibold text-slate-800">Direct vs Indirect</h2>
        <div className="text-xs font-semibold text-slate-400 uppercase mt-1">Traffic comparison</div>
      </div>

      {/* Chart container */}
      {/* <div className="flex-grow relative">
        <BarChart data={chartData} />
      </div> */}
    </div>
  );
}

export default DashboardCard04;
