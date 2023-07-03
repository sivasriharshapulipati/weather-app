import React from 'react';
import Weather from './Weather';

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Weather />
      </div>
    </div>
  );
};

export default App;
