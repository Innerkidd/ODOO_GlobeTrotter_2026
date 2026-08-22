import React from 'react';
import { Wallet } from 'lucide-react';
import EmptyState from '../../common/EmptyState/EmptyState';

const EmptyBudgetState = ({ onAddDetails }) => {
  return (
    <EmptyState
      icon={Wallet}
      title="No budget data available yet"
      description="Add trip details and activities to see estimated costs."
      actionLabel="Go to Itinerary Builder"
      onAction={onAddDetails}
    />
  );
};

export default EmptyBudgetState;
