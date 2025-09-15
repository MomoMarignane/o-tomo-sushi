import React from 'react';

const TestBanner: React.FC = () => {
  console.log('TestBanner is rendering!');
  
  return (
    <div 
      className="fixed top-0 left-0 right-0 z-[60] bg-red-600 text-white text-center py-4 font-bold"
      style={{ zIndex: 9999 }}
    >
      🎉 TEST BANNER - CECI DEVRAIT ÊTRE VISIBLE ! 🎉
    </div>
  );
};

export default TestBanner;
