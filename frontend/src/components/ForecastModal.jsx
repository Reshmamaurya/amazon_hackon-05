import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';

const ForecastModal = ({ onClose }) => {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState('');

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) throw new Error("User not logged in");

        const uid = currentUser.uid;
        const url = new URL(`http://localhost:5000/api/forecast/${uid}`);

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch forecast");

        const data = await response.json();
        setForecastData(data);

        // 🔍 Optional: LLM analysis call
        const analysisRes = await fetch('http://localhost:5000/api/llm-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data }),
        });

        const { analysis: message } = await analysisRes.json();
        setAnalysis(message || "No insights available.");
      } catch (err) {
        console.error("Error:", err);
        setForecastData(null);
        setAnalysis("Forecast unavailable or insufficient data.");
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">30-Day Spending Forecast</h2>

        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : forecastData ? (
          <>
            <div className="text-gray-800 mb-4">
              <p><strong>Estimated Spend:</strong> ₹{forecastData.forecast.toFixed(2)}</p>
              <p><strong>Average Daily Spend:</strong> ₹{forecastData.dailyAvg.toFixed(2)}</p>
            </div>
            <div className="text-sm text-slate-600 bg-slate-100 rounded p-3">
              <strong>Insight:</strong> {analysis}
            </div>
          </>
        ) : (
          <div className="text-red-500">Unable to forecast. Not enough data or user not logged in.</div>
        )}

        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForecastModal;
