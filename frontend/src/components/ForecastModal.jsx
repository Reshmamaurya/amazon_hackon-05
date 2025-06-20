import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const ForecastModal = ({ onClose }) => {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) throw new Error('User not logged in');

        const res = await fetch(`http://localhost:5000/api/forecast/${currentUser.uid}`);
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || 'Forecast API failed');
        }

        const data = await res.json();
        setForecastData(data);
      } catch (err) {
        console.error('Forecast Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, []);

  const chartData = forecastData?.series ? {
    labels: forecastData.series.map((point) => point.ds), // ✅ FIXED: was 'point.date'
    datasets: [
      {
        label: 'Forecast ₹/day',
        data: forecastData.series.map((point) => point.yhat), // ✅ FIXED: was 'point.value'
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  } : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-indigo-600">SmartSpend Forecast</h2>

        {loading ? (
          <div className="text-center text-gray-500">Crunching your past spends...</div>
        ) : error ? (
          <div className="text-red-600 text-center">{error}</div>
        ) : forecastData ? (
          <>
            <div className="text-gray-800 text-base space-y-1">
              <p>
                <strong>Total Forecast (30d):</strong>{' '}
                ₹{forecastData.forecast?.toFixed(2)}
              </p>
              <p>
                <strong>Avg Daily Spend:</strong>{' '}
                ₹{forecastData.dailyAvg?.toFixed(2)}
              </p>
            </div>

            {chartData && (
              <div className="bg-slate-100 rounded-xl p-4">
                <Line data={chartData} />
              </div>
            )}
          </>
        ) : (
          <div className="text-red-500 text-center">No forecast data available.</div>
        )}

        <div className="text-right">
          <button
            onClick={onClose}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-500 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForecastModal;
