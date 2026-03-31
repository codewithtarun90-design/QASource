import React from 'react';

const MainContent = ({ flash, content }) => {
  return (
    <main className="flex-1 overflow-y-auto p-6">
      {flash.success && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded">
          <div className="flex items-center">
            <i className="fas fa-check-circle text-green-500 mr-3"></i>
            <p className="text-green-700">{flash.success}</p>
          </div>
        </div>
      )}
      {flash.error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
          <div className="flex items-center">
            <i className="fas fa-exclamation-circle text-red-500 mr-3"></i>
            <p className="text-red-700">{flash.error}</p>
          </div>
        </div>
      )}
      {content}
    </main>
  );
};

export default MainContent;
