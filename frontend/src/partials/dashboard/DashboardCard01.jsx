import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import LineChart from '../../charts/LineChart01';
import { chartAreaGradient } from '../../charts/ChartjsConfig';
import EditMenu from '../../components/DropdownEditMenu';
import { adjustColorOpacity, getCssVariable } from '../../utils/Utils';

function DashboardCard01({ startDate, endDate }) {
  const [chartData, setChartData] = useState(null);
  const [uid, setUid] = useState(null);
  const [analysis, setAnalysis] = useState("Loading analysis...");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUid(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!uid || !startDate || !endDate) return;

    async function fetchBurnRate() {
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
              label: 'Spending ₹', // ✅ This adds ₹ to tooltip label
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

        // 🔍 Fetch LLM analysis
        const analysisRes = await fetch('http://localhost:5000/api/llm-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data }),
        });

        const { analysis: message } = await analysisRes.json();
        setAnalysis(message || "No insights available.");
      } catch (err) {
        console.error("Error:", err);
        setAnalysis("Failed to load analysis.");
      }
    }

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
        <div className="relative">
          <EditMenu align="right">
            <div className="px-4 py-2 text-sm text-slate-700 whitespace-normal max-w-[250px] leading-relaxed">
              {analysis}
            </div>
          </EditMenu>
        </div>
      </div>

      {/* Value and Status */}
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
          <LineChart
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      return `${context.dataset.label}: ₹${context.parsed.y}`;
                    },
                  },
                },
                legend: { display: false },
              },
            }}
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-400">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardCard01;
