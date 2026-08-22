import React from 'react';
import CalendarDayCard from '../CalendarDayCard/CalendarDayCard';

const CalendarGrid = ({ days = [], currency = '₹' }) => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {days.map((day, index) => (
        <CalendarDayCard
          key={day.dayNumber}
          day={day}
          currency={currency}
          defaultExpanded={index === 0}
        />
      ))}
    </div>
  );
};

export default CalendarGrid;
