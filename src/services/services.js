// src/services/services.js
import { apiFetch } from '../utils/api';

export function getUserProfile() {
  return apiFetch('/users/me');
}

export function searchRooms(searchData) {
  return apiFetch('/search', {
    method: 'POST',
    body: JSON.stringify(searchData)
  });
}

export function bookRoom(data) {
  return apiFetch('/book', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}
