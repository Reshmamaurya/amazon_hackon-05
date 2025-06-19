import React, { useRef, useEffect, useState } from 'react';
import {
  Chart,
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';

import { formatValue } from '../utils/Utils';

Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend);

function BarChart01({ data }) {
  const [chart, setChart] = useState(null);
  const canvas = useRef(null);
  const legend = useRef(null);

  useEffect(() => {
    if (!canvas.current || !data || !data.labels?.length) return;

    const ctx = canvas.current.getContext('2d');
    if (!ctx) return;

    if (chart) chart.destroy();

    const newChart = new Chart(ctx, {
      type: 'bar',
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: { top: 12, bottom: 16, left: 20, right: 20 },
        },
        scales: {
          y: {
            border: { display: false },
            ticks: {
              maxTicksLimit: 5,
              callback: (value) => `${formatValue(value)}`,
              color: '#1e293b', // darker label color
              font: { size: 12 },
            },
            grid: {
              color: 'rgba(203,213,225,0.2)',
            },
          },
          x: {
            type: 'category',
            labels: data.labels,
            grid: { display: false },
            ticks: {
              color: '#1e293b', // darker label color
              font: { size: 12 },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: '#111827',
            titleColor: '#f3f4f6',
            bodyColor: '#d1d5db',
            padding: 10,
            borderColor: '#4b5563',
            borderWidth: 1,
            callbacks: {
              title: (context) => data.labels[context[0].dataIndex],
              label: (context) => `${formatValue(context.parsed.y)}`,
            },
          },
        },
        interaction: { intersect: false, mode: 'nearest' },
        animation: { duration: 500 },
      },
    });

    setChart(newChart);
    return () => newChart.destroy();
  }, [data]);

  return (
    <>
      <div className="px-5 py-3">
        <ul ref={legend} className="flex flex-wrap gap-x-4"></ul>
      </div>
      <div className="relative w-full h-[240px]">
        <canvas ref={canvas} />
      </div>
    </>
  );
}

export default BarChart01;
