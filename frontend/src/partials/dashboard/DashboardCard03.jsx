import React from 'react';
import LineChart from '../../charts/LineChart01';
import { chartAreaGradient } from '../../charts/ChartjsConfig';
import EditMenu from '../../components/DropdownEditMenu';
import { adjustColorOpacity, getCssVariable } from '../../utils/Utils';
import { Link } from 'react-router-dom';

function DashboardCard03() {
  const chartData = {
    labels: [
      '12-01-2022', '01-01-2023', '02-01-2023', '03-01-2023', '04-01-2023',
      '05-01-2023', '06-01-2023', '07-01-2023', '08-01-2023', '09-01-2023',
      '10-01-2023', '11-01-2023', '12-01-2023', '01-01-2024', '02-01-2024',
      '03-01-2024', '04-01-2024', '05-01-2024', '06-01-2024', '07-01-2024',
      '08-01-2024', '09-01-2024', '10-01-2024', '11-01-2024', '12-01-2024', '01-01-2025',
    ],
    datasets: [
      {
        label: 'Forecast Spend',
        data: [
          540, 466, 540, 466, 385, 432, 334,
          334, 289, 289, 200, 289, 222, 289,
          289, 403, 554, 304, 289, 270, 134,
          270, 829, 344, 388, 364,
        ],
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          return chartAreaGradient(ctx, chartArea, [
            { stop: 0, color: adjustColorOpacity(getCssVariable('--color-violet-500'), 0) },
            { stop: 1, color: adjustColorOpacity(getCssVariable('--color-violet-500'), 0.2) },
          ]);
        },
        borderColor: getCssVariable('--color-violet-500'),
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: getCssVariable('--color-violet-500'),
        pointHoverBackgroundColor: getCssVariable('--color-violet-500'),
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
        tension: 0.2,
      },
      {
        label: 'Actual Spend',
        data: [
          689, 562, 477, 477, 477, 477, 458,
          314, 430, 378, 430, 498, 642, 350,
          145, 145, 354, 260, 188, 188, 300,
          300, 282, 364, 660, 554,
        ],
        borderColor: adjustColorOpacity(getCssVariable('--color-gray-500'), 0.5),
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: adjustColorOpacity(getCssVariable('--color-gray-500'), 0.5),
        pointHoverBackgroundColor: adjustColorOpacity(getCssVariable('--color-gray-500'), 0.5),
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-md rounded-2xl p-5 text-slate-900">
      {/* Card Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Forecast vs Actual Spend</h2>
          <div className="text-xs font-semibold text-slate-400 uppercase mt-1">Projected vs Real Expenses</div>
        </div>
        <EditMenu align="right" className="relative inline-flex">
          <li>
            <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">Option 1</Link>
          </li>
          <li>
            <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">Option 2</Link>
          </li>
          <li>
            <Link className="font-medium text-sm text-red-500 hover:text-red-600 flex py-1 px-3" to="#0">Remove</Link>
          </li>
        </EditMenu>
      </div>

      {/* Value and Trend */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-3xl font-bold text-slate-900">₹9,962</div>
        <div className="text-sm font-medium text-green-700 px-2 py-0.5 bg-green-100 rounded-full">+49%</div>
      </div>

      {/* Chart */}
      <div className="h-32 relative">
        <LineChart
          data={chartData}
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
}

export default DashboardCard03;
