import React from 'react';

const NotificationsScreen = () => {
  return (
    <div className="min-h-screen flex justify-center items-start p-6 bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 border border-gray-200">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Notifications (4)</h2>
          <button className="text-gray-500">
          </button>
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4].map((notification) => (
            <div
              key={notification}
              className="flex items-center justify-between bg-gray-100 rounded-lg p-3"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-red-500 mr-3"></div>
             
                <div>
                  <p className="font-semibold text-sm">សារជូនដំណឹង {notification}</p>
                  <p className="text-xs text-gray-500">
                    ទំព័រដែលអ្នកសុំមិនអាចប្រើបានទេ
                  </p>
                </div>
              </div>
              <div className="text-xs text-gray-400">Now</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsScreen;
