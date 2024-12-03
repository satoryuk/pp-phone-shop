import React from 'react';

const NotificationCard = () => {
  return (
    <div className="w-80 bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Notifications (4)</h2>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map((notification) => (
          <div
            key={notification}
            className="flex items-center justify-between bg-gray-100 rounded-lg p-3"
          >
            <div className="flex items-center">
              <div
                className="w-10 h-10 rounded-full bg-red-500 mr-3 flex-shrink-0 flex-grow-0"
              ></div>
              <div>
                <p className="font-semibold text-sm">សារជូនដំណឹង {notification}</p>
                <p className="text-xs text-gray-500">
                  ទូរស័ព្ទបញ្ចុះតម្លៃម៉ែអាថោកទិញថ្ងៃស្អែកយក១០ឆ្នាំក្រោយ
                </p>
              </div>
            </div>
            <div className="text-xs text-gray-400">Now</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationCard;
