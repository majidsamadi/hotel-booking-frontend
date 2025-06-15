// src/services/services.js
import { apiFetch } from '../utils/api';

export function getUserProfile() {
  return apiFetch('/users/me');
}

export function updateUserProfile(data) {
  return apiFetch('/users/me', {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

export function searchRooms(params) {
  const query = new URLSearchParams(params).toString();
  return apiFetch(`/search/search?${query}`);
}

export function bookRoom(data) {
  return apiFetch('/bookings/', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

// ✅ NEW: Fetch all bookings
export function getAllBookings() {
  return apiFetch('/bookings/me');
}

// ✅ NEW: Fetch upcoming bookings only
export function getUpComingBookings() {
  return apiFetch('/bookings/me/upcoming');
}

// ✅ NEW: Cancel a booking
export function cancelBooking(bookingId) {
  return apiFetch(`/bookings/${bookingId}/cancel`, {
    method: 'POST'
  });
}
