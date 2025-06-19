import React from 'react';

function DashboardCard12() {
  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow rounded-xl">
      <header className="px-5 py-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-800">Recent Activity</h2>
      </header>
      <div className="p-5">
        <div className="overflow-x-auto">
        <div className="max-h-80 overflow-y-auto"> 

        {/* June 19, 2025 */}
        <div>
          <header className="text-xs uppercase text-gray-500 bg-gray-100 rounded font-semibold p-2">June 19, 2025</header>
          <ul className="my-1">
            <li className="flex px-2">
              <div className="w-9 h-9 rounded-full shrink-0 bg-green-500 my-2 mr-3 flex items-center justify-center">
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 36 36">
                  <path d="M18 16l-6-6h12z" />
                </svg>
              </div>
              <div className="grow flex items-center border-b border-gray-200 text-sm py-2">
                <div className="grow flex justify-between">
                  <div>Your order #ORD123456 has been <span className="font-medium text-green-600">confirmed</span></div>
                  <div className="shrink-0 self-end ml-2 text-xs text-gray-400">10:15 AM</div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* June 18, 2025 */}
        <div>
          <header className="text-xs uppercase text-gray-500 bg-gray-100 rounded font-semibold p-2">June 18, 2025</header>
          <ul className="my-1">
            <li className="flex px-2">
              <div className="w-9 h-9 rounded-full shrink-0 bg-red-500 my-2 mr-3 flex items-center justify-center">
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 36 36">
                  <path d="M19 13h-2v6h2zm0 8h-2v2h2z" />
                </svg>
              </div>
              <div className="grow flex items-center border-b border-gray-200 text-sm py-2">
                <div className="grow flex justify-between">
                  <div>Your return for <span className="font-medium text-gray-800">Noise Smartwatch</span> was <span className="text-red-500 font-medium">completed</span></div>
                  <div className="shrink-0 self-end ml-2 text-xs text-gray-400">2:00 PM</div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* More recent days */}
        {[...Array(8)].map((_, index) => {
          const dates = [
            'June 17, 2025',
            'June 16, 2025',
            'June 15, 2025',
            'June 14, 2025',
            'June 13, 2025',
            'June 12, 2025',
            'June 11, 2025',
            'June 10, 2025'
          ];

          const messages = [
            'You reviewed your order for Bluetooth Speaker',
            'Your payment for Yoga Mat has been processed',
            'Gaming Mouse shipped via BlueDart',
            'You cancelled the order for Electric Iron',
            'Support ticket regarding Pigeon Kettle was closed',
            'New offer on Summer Top shared with you',
            'Return initiated for Saree Combo',
            'Order #ORD123457 successfully delivered'
          ];

          const colors = ['blue', 'violet', 'sky', 'orange', 'green', 'rose', 'yellow', 'teal'];

          return (
            <div key={index}>
              <header className="text-xs uppercase text-gray-500 bg-gray-100 rounded font-semibold p-2">{dates[index]}</header>
              <ul className="my-1">
                <li className="flex px-2">
                  <div className={`w-9 h-9 rounded-full shrink-0 bg-${colors[index]}-500 my-2 mr-3 flex items-center justify-center`}>
                    <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" />
                    </svg>
                  </div>
                  <div className="grow flex items-center border-b border-gray-200 text-sm py-2">
                    <div className="grow flex justify-between">
                      <div>{messages[index]}</div>
                      <div className="shrink-0 self-end ml-2 text-xs text-gray-400">9:00 AM</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          );
        })}
       </div>
       </div>
      </div>
    </div>
  );
}

export default DashboardCard12;