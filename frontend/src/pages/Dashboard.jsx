import React from 'react';
import './Dashboard.css';

import Header from '../partials/Header';
import Datepicker from '../components/Datepicker';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import Banner from '../partials/Banner';

function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-screen-xl mx-auto">

          {/* Top Row */}
          <div className="dashboard-header">
            <h1 className="dashboard-title">Dashboard</h1>
            <div className="dashboard-actions">
              <Datepicker align="right" />
              <button className="add-view-btn">
                <svg className="add-icon" width="16" height="16" viewBox="0 0 16 16">
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span className="add-view-text">Add View</span>
              </button>
            </div>
          </div>


          {/* Dashboard Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="dashboard-card-row">
            <DashboardCard01 />
            <DashboardCard02 />
            <DashboardCard03 />
          </div>
          </div>
        </div>
      </main>

      {/* Footer Banner */}
      <Banner />
    </div>
  );
}

export default Dashboard;
