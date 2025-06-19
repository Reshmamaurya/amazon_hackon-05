import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import EditMenu from '../../components/DropdownEditMenu';

ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardCard05({ startDate, endDate }) {
  const [uid, setUid] = useState(null);
  const [breakdown, setBreakdown] = useState({});
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState("Loading insights...");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUid(user.uid);
      else setUid(null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!uid || !startDate || !endDate) return;

    const fetchData = async () => {
      try {
        const url = new URL(`http://localhost:5000/api/payment-breakdown/${uid}`);
        url.searchParams.append('startDate', startDate);
        url.searchParams.append('endDate', endDate);
    
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch payment breakdown");
    
        const data = await res.json();
        console.log("Payment Breakdown:", data); // Debug
    
        setBreakdown(data);
    
        const analysisRes = await fetch('http://localhost:5000/api/analysis/payment-method', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data }),
        });
    
        const { analysis: message } = await analysisRes.json();
        setAnalysis(message || "No insights available.");
      } catch (err) {
        console.error("Error:", err);
        setAnalysis("Failed to load analysis.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [uid, startDate, endDate]);

  const colors = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#A78BFA', '#14B8A6'];

  const chartData = {
    labels: Object.keys(breakdown),
    datasets: [
      {
        data: Object.values(breakdown),
        backgroundColor: colors,
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="flex flex-col bg-white shadow-md rounded-2xl text-slate-900 p-4 h-[320px]">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-lg font-semibold">Payment Method Breakdown</h2>
        <div className="relative">
          <EditMenu align="right">
            <div className="px-4 py-2 text-sm text-slate-700 whitespace-normal max-w-[250px] leading-relaxed">
              {analysis}
            </div>
          </EditMenu>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex-grow flex items-center justify-center text-sm text-slate-500">Loading chart…</div>
      ) : Object.keys(breakdown).length === 0 ? (
        <div className="flex-grow flex items-center justify-center text-sm text-slate-500">No payment data found</div>
      ) : (
        <div className="flex flex-row flex-grow items-center justify-between overflow-hidden">
          <div className="w-[50%] aspect-square flex items-center justify-center">
            <Doughnut
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                },
                cutout: '60%',
              }}
            />
          </div>
          <div className="flex flex-col text-sm text-slate-600 space-y-1 pr-2">
            {Object.keys(breakdown).map((method, idx) => (
              <div key={method} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors[idx % colors.length] }}
                ></div>
                <span className="font-medium text-slate-700">{method}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardCard05;
