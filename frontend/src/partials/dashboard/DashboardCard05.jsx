import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardCard05({ startDate, endDate }) {
  const [uid, setUid] = useState(null);
  const [breakdown, setBreakdown] = useState({});
  const [loading, setLoading] = useState(true);

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
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!uid || !startDate || !endDate) return;

    async function fetchBreakdown() {
      try {
        const res = await fetch(`http://localhost:5000/api/payment-breakdown/${uid}?startDate=${startDate}&endDate=${endDate}`);
        const data = await res.json();
        setBreakdown(data);
      } catch (err) {
        console.error("Failed to fetch payment breakdown:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBreakdown();
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
      <h2 className="text-lg font-semibold mb-3">Payment Method Breakdown</h2>
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
