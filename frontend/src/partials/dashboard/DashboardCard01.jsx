import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import LineChart from '../../charts/LineChart01';
import { chartAreaGradient } from '../../charts/ChartjsConfig';
import EditMenu from '../../components/DropdownEditMenu';
import { adjustColorOpacity, getCssVariable } from '../../utils/Utils';

function DashboardCard01({ startDate, endDate }) {
  const [chartData, setChartData] = useState(null);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        console.warn('User not logged in');
        setUid(null);
      }
    });

    return () => unsubscribe(); // cleanup listener
  }, []);

  useEffect(() => {
    if (!uid || !startDate || !endDate) return;

    const fetchBurnRate = async () => {
      try {
        const url = new URL(`http://localhost:5000/api/payments/burnrate/${uid}`);
        url.searchParams.append('start', startDate);
        url.searchParams.append('end', endDate);

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch burn rate");

        const data = await response.json();

        const labels = data.map(item => item._id);
        const values = data.map(item => item.totalSpent);
        
        setChartData({
          labels,
          datasets: [
            {
              data: values,
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
              tension: 0.3,
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching chart data:", err);
      }
    };

    fetchBurnRate();
  }, [uid, startDate, endDate]);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white text-slate-900 shadow-md rounded-2xl p-5">
      {/* Card Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Burn Rate</h2>
          <div className="text-xs font-semibold text-slate-400 uppercase mt-1">Spending Trend</div>
        </div>
        <EditMenu align="right" className="relative inline-flex">
          <li><Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">Option 1</Link></li>
          <li><Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">Option 2</Link></li>
          <li><Link className="font-medium text-sm text-red-500 hover:text-red-600 flex py-1 px-3" to="#0">Remove</Link></li>
        </EditMenu>
      </div>

      {/* Value and Growth */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-3xl font-bold text-slate-900">
          ₹{chartData ? chartData.datasets[0].data.reduce((a, b) => a + b, 0) : '--'}
        </div>
        <div className="text-sm font-medium text-green-700 px-2 py-0.5 bg-green-100 rounded-full">
          + Active
        </div>
      </div>

      {/* Chart */}
      <div className="h-32 relative">
        {chartData ? (
          <LineChart data={chartData} className="absolute inset-0 w-full h-full" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-400">Loading...</div>
        )}
      </div>
    </div>
  );
}

export default DashboardCard01;
