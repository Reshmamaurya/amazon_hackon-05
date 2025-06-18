import React, { useState, useEffect } from 'react';
import Tooltip from '../../components/Tooltip';
import RealtimeChart from '../../charts/RealtimeChart';
import { chartAreaGradient } from '../../charts/ChartjsConfig';
import { adjustColorOpacity, getCssVariable } from '../../utils/Utils';

function DashboardCard05() {
  const fullData = [
    57.81, 57.75, 55.48, 54.28, 53.14, 52.25, 51.04, 52.49, 55.49, 56.87,
    53.73, 56.42, 58.06, 55.62, 58.16, 55.22, 58.67, 60.18, 61.31, 63.25,
    65.91, 64.44, 65.97, 62.27, 60.96, 59.34, 55.07, 59.85, 53.79, 51.92,
    50.95, 49.65, 48.09, 49.81, 47.85, 49.52, 50.21, 52.22, 54.42, 53.42,
    50.91, 58.52, 53.37, 57.58, 59.09, 59.36, 58.71, 59.42, 55.93, 57.71,
    50.62, 56.28, 57.37, 53.08, 55.94, 55.82, 53.94, 52.65, 50.25,
  ];

  const initialRange = 35;
  const [counter, setCounter] = useState(0);
  const [slicedData, setSlicedData] = useState(fullData.slice(0, initialRange));
  const [slicedLabels, setSlicedLabels] = useState(generateInitialTimestamps(initialRange));

  function generateInitialTimestamps(range) {
    const now = Date.now();
    return Array.from({ length: range }, (_, i) => new Date(now - (range - i) * 2000));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setSlicedData((prev) => {
      const nextIndex = initialRange + counter;
      const nextValue = fullData[nextIndex % fullData.length];
      return [...prev.slice(1), nextValue];
    });

    setSlicedLabels((prev) => [...prev.slice(1), new Date()]);
  }, [counter]);

  const chartData = {
    labels: slicedLabels,
    datasets: [
      {
        data: slicedData,
        fill: true,
        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart;
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
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-md rounded-2xl p-5 text-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Real-Time Value</h2>
          <div className="text-xs font-semibold text-slate-400 uppercase mt-1">Live Updates</div>
        </div>
        <Tooltip className="ml-2">
          <div className="text-xs text-center whitespace-nowrap">
            Built with{' '}
            <a className="underline" href="https://www.chartjs.org/" target="_blank" rel="noreferrer">
              Chart.js
            </a>
          </div>
        </Tooltip>
      </div>

      {/* Chart */}
      <div className="aspect-[4/3]">
        <RealtimeChart data={chartData} width={595} height={240} />
      </div>
    </div>
  );
}

export default DashboardCard05;
