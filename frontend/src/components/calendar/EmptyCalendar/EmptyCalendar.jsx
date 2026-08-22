import React from 'react';
import { CalendarDays } from 'lucide-react';
import EmptyState from '../../common/EmptyState/EmptyState';

const EmptyCalendar = ({ onGoToBuilder }) => {
  return (
    <EmptyState
      icon={CalendarDays}
      title="Your itinerary is empty"
      description="Add destinations and activities to start visualising your travel timeline."
      actionLabel="Back to Itinerary Builder"
      onAction={onGoToBuilder}
    />
  );
};

export default EmptyCalendar;
