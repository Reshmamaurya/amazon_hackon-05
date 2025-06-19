import React, { useState } from 'react';
import BarChart from '../../charts/BarChart01';
import { formatValue } from '../../utils/Utils';

function DashboardCard04() {
  const [showOffer, setShowOffer] = useState(true);
  const [showActual, setShowActual] = useState(true);

  const offerData = [800, 1600, 900, 1300, 1900, 1700];
  const actualData = [4800, 2600, 5100, 4700, 5000, 4800];

  const chartData = {
    labels: ['Sonata Watch', 'LaxmiPati Saree', 'OnePlus Nord Phone', 'Noise SmartWatch', 'Pigeon Kettle', 'Summer Top'],
    datasets: [
      showOffer && {
        label: 'Offer Price',
        data: offerData,
        backgroundColor: '#60A5FA',
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      showActual && {
        label: 'Actual Price',
        data: actualData,
        backgroundColor: '#8B5CF6',
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ].filter(Boolean),
  };

  const totalOffer = offerData.reduce((a, b) => a + b, 0);
  const totalActual = actualData.reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col h-full bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Offer vs Actual Price</h2>
        <div className="text-xs text-slate-400">SAVINGS THROUGH SMART PAYMENTS</div>
      </header>
      <div className="px-5 pt-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowOffer(!showOffer)}
            className={`flex items-center space-x-2 transition-opacity duration-300 ${showOffer ? '' : 'opacity-30'}`}
          >
            <svg className="w-3 h-3 fill-blue-400" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="8" />
            </svg>
            <span className="text-slate-800 font-bold text-lg">{formatValue(totalOffer)}</span>
            <span className="text-slate-500 text-sm">Offer Price</span>
          </button>
          <button
            onClick={() => setShowActual(!showActual)}
            className={`flex items-center space-x-2 transition-opacity duration-300 ${showActual ? '' : 'opacity-30'}`}
          >
            <svg className="w-3 h-3 fill-purple-500" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="8" />
            </svg>
            <span className="text-slate-800 font-bold text-lg">{formatValue(totalActual)}</span>
            <span className="text-slate-500 text-sm">Actual Price</span>
          </button>
        </div>
      </div>
      <div className="grow">
        <BarChart data={chartData} width={595} height={248} />
      </div>
    </div>
  );
}

export default DashboardCard04;
