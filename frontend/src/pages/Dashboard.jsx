import React, { useState } from 'react';

import Datepicker from '../components/Datepicker';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../partials/dashboard/DashboardCard05';
import DashboardCard06 from '../partials/dashboard/DashboardCard06';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard08 from '../partials/dashboard/DashboardCard08';
import DashboardCard09 from '../partials/dashboard/DashboardCard09';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard11 from '../partials/dashboard/DashboardCard11';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import DashboardCard13 from '../partials/dashboard/DashboardCard13';

function Dashboard() {
  const [dateRange, setDateRange] = useState({
    from: new Date(2025, 4, 1),     // May 1, 2025
    to: new Date(2025, 4, 15),      // May 15, 2025
  });
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100"> {/* Light gray background */}

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">Dashboard</h1>
              </div>

              <div className="flex justify-end items-center gap-2">

              {/* Datepicker */}
              <Datepicker dateRange={dateRange} setDateRange={setDateRange} align="right" />
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                  <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                <span className="font-medium">Add View</span>
              </button>

              </div>


            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <DashboardCard01
                height="short"
                startDate={dateRange.from.toISOString().split('T')[0]}
                endDate={dateRange.to.toISOString().split('T')[0]}
              />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <DashboardCard02
              startDate={dateRange.from.toISOString().split('T')[0]}
              endDate={dateRange.to.toISOString().split('T')[0]}
            />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <DashboardCard03 height="short" />
            </div>

            {/* Cards 4–13 */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <DashboardCard04 />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <DashboardCard05 />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <DashboardCard06 />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <DashboardCard07 />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <DashboardCard08 />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <DashboardCard09 />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <DashboardCard10 />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <DashboardCard11 />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <DashboardCard12 />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <DashboardCard13 />
            </div>
          </div>


          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
