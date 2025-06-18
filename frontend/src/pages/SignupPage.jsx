import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const SmartSpend = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [summary, setSummary] = useState({ total: 0, topCategory: '' });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
      else setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchSpendingData = async () => {
      if (!userId) return;
      try {
        const res = await fetch(`http://localhost:5000/api/payment-breakdown/${userId}`);
        const data = await res.json();

        if (
          data &&
          typeof data === 'object' &&
          Object.values(data).every((val) => typeof val === 'number')
        ) {
          const total = Object.values(data).reduce((a, b) => a + b, 0);
          const topCategory = Object.entries(data).reduce((a, b) => (b[1] > a[1] ? b : a))[0];

          setSummary({ total, topCategory });

          setChartData({
            labels: Object.keys(data),
            datasets: [
              {
                data: Object.values(data),
                backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
                  '#4BC0C0',
                  '#9966FF',
                  '#FF9F40'
                ],
                borderWidth: 1
              }
            ]
          });
        }
      } catch (error) {
        console.error("❌ Fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpendingData();
  }, [userId]);

  return (
    <div className="smartspend-container">
      <div className="header-section">
        <h1>SmartSpend Overview</h1>
        <p>📊 See how you're using different payment methods</p>
      </div>

      {loading ? (
        <p className="fade-in">Loading chart...</p>
      ) : chartData ? (
        <div className="content-section">
          <div className="chart-area">
            <Pie
              data={chartData}
              options={{
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: (ctx) => {
                        let label = ctx.label || '';
                        let value = ctx.raw;
                        return `${label}: ₹${value}`;
                      }
                    }
                  },
                  legend: {
                    position: 'bottom',
                    labels: {
                      boxWidth: 15,
                      padding: 10
                    }
                  }
                }
              }}
            />
          </div>

          <div className="summary">
            <h3>Spending Summary</h3>
            <p><strong>Total Spent:</strong> ₹{summary.total}</p>
            <p><strong>Top Category:</strong> {summary.topCategory}</p>
          </div>
        </div>
      ) : (
        <p>No spending data available.</p>
      )}
    </div>
  );
};

export default SmartSpend;
