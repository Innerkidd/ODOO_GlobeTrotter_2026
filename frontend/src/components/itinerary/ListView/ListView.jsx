import React from 'react';
import DaySection from '../DaySection/DaySection';
import EmptyItinerary from '../EmptyItinerary/EmptyItinerary';

const ListView = ({ days = [], currency = '€' }) => {
  if (!days || days.length === 0) {
    return <EmptyItinerary />;
  }

  return (
    <div className="space-y-6">
      {days.map((dayData) => (
        <DaySection
          key={dayData.dayNumber}
          dayData={dayData}
          currency={currency}
        />
      ))}
    </div>
  );
};

export default ListView;
