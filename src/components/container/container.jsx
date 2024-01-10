import React from 'react';

function Container({children}) {
  return (
    <div>
      <div className="w-full max-w-7xl mx-auto px-4">{children}</div>
    </div>
  );
}

export default Container;
