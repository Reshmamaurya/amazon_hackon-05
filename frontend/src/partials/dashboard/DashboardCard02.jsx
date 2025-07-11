import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import EditMenu from '../../components/DropdownEditMenu';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function DashboardCard02({ startDate, endDate }) {
  const [uid, setUid] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [analysis, setAnalysis] = useState("Loading insights...");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUid(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!uid || !startDate || !endDate) return;

    const fetchData = async () => {
      try {
        const url = new URL(`http://localhost:5000/api/payments/category-summary/${uid}`);
        url.searchParams.append('start', startDate);
        url.searchParams.append('end', endDate);

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch category data");

        const data = await res.json();
        setCategoryData(data);

        // Fetch LLM analysis
        const analysisRes = await fetch('http://localhost:5000/api/analysis/category', {
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

    fetchData();
  }, [uid, startDate, endDate]);

  const chartData = categoryData && {
    labels: categoryData.map(item => item.category),
    datasets: [
      {
        label: 'Spending ₹',
        data: categoryData.map(item => item.total),
        backgroundColor: '#6366F1',
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white text-slate-900 shadow-md rounded-2xl p-5">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Spending by Category</h2>
          <div className="text-xs font-semibold text-slate-400 uppercase mt-1">Where your money goes</div>
        </div>
        <div className="relative">
        <EditMenu align="right">
          <div className="px-4 py-2 text-sm text-slate-700 whitespace-normal max-w-[250px] leading-relaxed">
            {analysis}
          </div>
        </EditMenu>

        </div>
      </div>

      <div className="h-48">
        {chartData ? (
          <Bar
            data={chartData}
            options={{
              indexAxis: 'y',
              responsive: true,
              plugins: {
                legend: { display: false },
              },
              scales: {
                x: { beginAtZero: true },
              },
            }}
          />
        ) : (
          <div className="text-sm text-slate-400 h-full flex items-center justify-center">Loading...</div>
        )}
      </div>
    </div>
  );
}

export default DashboardCard02;