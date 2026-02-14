import React from 'react';

const CollectorROV: React.FC = () => {
  const queue = 0;
  
  return (
	<div>
	  <div>📝</div>
	  <div>Collector</div>
	  <div>Story Journalist</div>
	  <div>{queue} stories in queue</div>
	</div>
  );
};

export default CollectorROV;