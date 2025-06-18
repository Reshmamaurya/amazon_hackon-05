import React from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import { chartAreaGradient } from '../../charts/ChartjsConfig';
import EditMenu from '../../components/DropdownEditMenu';

import { adjustColorOpacity, getCssVariable } from '../../utils/Utils';
import './DashboardCard03.css'; // Add custom styles here

function DashboardCard03() {
  const chartData = {
    labels: [
      '12-01-2022', '01-01-2023', '02-01-2023', '03-01-2023', '04-01-2023',
      '05-01-2023', '06-01-2023', '07-01-2023', '08-01-2023', '09-01-2023',
      '10-01-2023', '11-01-2023', '12-01-2023', '01-01-2024', '02-01-2024',
      '03-01-2024', '04-01-2024', '05-01-2024', '06-01-2024', '07-01-2024',
      '08-01-2024', '09-01-2024', '10-01-2024', '11-01-2024', '12-01-2024',
      '01-01-2025',
    ],
    datasets: [
      {
        data: [
          540, 466, 540, 466, 385, 432, 334, 334, 289, 289,
          200, 289, 222, 289, 289, 403, 554, 304, 289, 270,
          134, 270, 829, 344, 388, 364,
        ],
        fill: true,
        backgroundColor: function (context) {
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
        data: [
          689, 562, 477, 477, 477, 477, 458, 314, 430, 378,
          430, 498, 642, 350, 145, 145, 354, 260, 188, 188,
          300, 300, 282, 364, 660, 554,
        ],
        borderColor: adjustColorOpacity(getCssVariable('--color-gray-500'), 0.25),
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: adjustColorOpacity(getCssVariable('--color-gray-500'), 0.25),
        pointHoverBackgroundColor: adjustColorOpacity(getCssVariable('--color-gray-500'), 0.25),
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="dashboard-card">
      {/* Card Header */}
      <div className="dashboard-card-header">
        <div className="dashboard-card-title-wrapper">
          <h2 className="dashboard-card-title">Acme Professional</h2>
          <div className="dashboard-card-subtitle">Sales</div>
        </div>
        <EditMenu align="right" className="dashboard-card-menu">
          <li>
            <Link className="dashboard-card-menu-link" to="#0">Option 1</Link>
          </li>
          <li>
            <Link className="dashboard-card-menu-link" to="#0">Option 2</Link>
          </li>
          <li>
            <Link className="dashboard-card-menu-link danger" to="#0">Remove</Link>
          </li>
        </EditMenu>
      </div>

      {/* Value and Trend */}
      <div className="dashboard-card-stats">
        <div className="dashboard-card-value">$9,962</div>
        <div className="dashboard-card-trend up">+49%</div>
      </div>

      {/* Chart */}
      <div className="dashboard-card-chart">
        <LineChart data={chartData} width={389} height={160} />
      </div>
    </div>
  );
}

export default DashboardCard03;
