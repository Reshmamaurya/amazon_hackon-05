import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function LineChart01({ data, className }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
      },
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8', font: { size: 12 } },
        grid: { display: false }
      },
      y: {
        ticks: { color: '#94a3b8', font: { size: 12 } },
        grid: { color: 'rgba(203,213,225,0.2)' }
      }
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
        backgroundColor: '#8b5cf6',
        borderWidth: 0,
      },
      line: {
        borderWidth: 2,
        tension: 0.4,
      }
    }
  };

  // Prepare enhanced dataset with gradient backgroundColor
  const enhancedData = {
    ...data,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      borderColor: '#8b5cf6',
      pointBackgroundColor: '#8b5cf6',
      fill: true,
      backgroundColor: function (context) {
        const { ctx, chartArea } = context.chart;

        if (!chartArea) return null;

        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)'); // Violet-500, top
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');   // Transparent, bottom
        return gradient;
      }
    }))
  };

  return (
    <div className={className}>
      <Line data={enhancedData} options={options} />
    </div>
  );
}

export default LineChart01;
