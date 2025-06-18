import React from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import { chartAreaGradient } from '../../charts/ChartjsConfig';
import EditMenu from '../../components/DropdownEditMenu';

import { adjustColorOpacity, getCssVariable } from '../../utils/Utils';
import './DashboardCard02.css';

function DashboardCard02() {
  const chartData = {
    labels: [...Array(26).keys()].map((i) => {
      const date = new Date(2022, 11 + i, 1);
      return date.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
    }),
    datasets: [
      {
        data: [622, 622, 426, 471, 365, 365, 238, 324, 288, 206, 324, 324, 500, 409, 409, 273, 232, 273, 500, 570, 767, 808, 685, 767, 685, 685],
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
        data: [732, 610, 610, 504, 504, 504, 349, 349, 504, 342, 504, 610, 391, 192, 154, 273, 191, 191, 126, 263, 349, 252, 423, 622, 470, 532],
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
      <div className="card-header">
        <div>
          <h2 className="card-title">Acme Advanced</h2>
          <div className="card-subtitle">Sales</div>
        </div>
        <EditMenu align="right" className="edit-menu">
          <li>
            <Link className="dropdown-link" to="#0">Option 1</Link>
          </li>
          <li>
            <Link className="dropdown-link" to="#0">Option 2</Link>
          </li>
          <li>
            <Link className="dropdown-link danger" to="#0">Remove</Link>
          </li>
        </EditMenu>
      </div>

      <div className="card-stats">
        <div className="card-value">$17,489</div>
        <div className="card-decline">-14%</div>
      </div>

      <div className="dashboard-card-chart">
        <LineChart data={chartData} width={389} height={160} />
      </div>
    </div>
  );
}

export default DashboardCard02;
