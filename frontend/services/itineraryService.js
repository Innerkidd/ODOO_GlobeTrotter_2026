import apiClient from '../api/axiosClient';

export async function getItineraryView(tripId) {
  const response = await apiClient.get(`/trips/${tripId}/itinerary-view`);
  return response;
}