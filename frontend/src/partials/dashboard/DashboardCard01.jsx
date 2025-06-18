import React from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import { chartAreaGradient } from '../../charts/ChartjsConfig';
import EditMenu from '../../components/DropdownEditMenu';
import { adjustColorOpacity, getCssVariable } from '../../utils/Utils';
import './DashboardCard01.css';

function DashboardCard01() {
  const chartData = {
    labels: [
      '12-01-2022','01-01-2023','02-01-2023','03-01-2023','04-01-2023','05-01-2023','06-01-2023','07-01-2023','08-01-2023','09-01-2023','10-01-2023','11-01-2023','12-01-2023','01-01-2024','02-01-2024','03-01-2024','04-01-2024','05-01-2024','06-01-2024','07-01-2024','08-01-2024','09-01-2024','10-01-2024','11-01-2024','12-01-2024','01-01-2025',
    ],
    datasets: [
      {
        data: [732,610,610,504,504,504,349,349,504,342,504,610,391,192,154,273,191,191,126,263,349,252,423,622,470,532],
        fill: true,
        backgroundColor: function(context) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          return chartAreaGradient(ctx, chartArea, [
            { stop: 0, color: adjustColorOpacity(getCssVariable('--color-violet-500'), 0) },
            { stop: 1, color: adjustColorOpacity(getCssVariable('--color-violet-500'), 0.2) }
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
        data: [532,532,532,404,404,314,314,314,314,314,234,314,234,234,314,314,314,388,314,202,202,202,202,314,720,642],
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
      {/* Header */}
      <div className="card-header">
        <div>
          <h2 className="card-title">Acme Plus</h2>
          <div className="card-subtitle">SALES</div>
        </div>
        <EditMenu align="right" className="edit-menu">
          <li><Link to="#0">Option 1</Link></li>
          <li><Link to="#0">Option 2</Link></li>
          <li><Link to="#0" className="remove">Remove</Link></li>
        </EditMenu>
      </div>

      {/* Value and Growth */}
      <div className="card-stats">
        <div className="card-value">$24,780</div>
        <div className="card-growth">+49%</div>
      </div>

      {/* Chart */}
      <div className="dashboard-card-chart">
        <LineChart data={chartData} width={389} height={160} />
      </div>
    </div>
  );
}

export default DashboardCard01;