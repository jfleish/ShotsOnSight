const API_BASE = '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(error.error || 'Request failed');
  }
  return res.json();
}

// Games
export const getGames = () => request<any[]>('/games');
export const getGame = (id: string) => request<any>(`/games/${id}`);

// Sessions
export const createSession = (gameId: string) =>
  request<any>('/sessions', { method: 'POST', body: JSON.stringify({ gameId }) });

export const getSession = (id: string) => request<any>(`/sessions/${id}`);

export const addPlayer = (sessionId: string, name: string, team: string, mode: string, beerBrand: string = 'Bud Light', focusedOn: string = 'None') =>
  request<any>(`/sessions/${sessionId}/players`, {
    method: 'POST',
    body: JSON.stringify({ name, team, mode, beerBrand, focusedOn }),
  });

export const removePlayer = (sessionId: string, playerId: string) =>
  request<any>(`/sessions/${sessionId}/players/${playerId}`, { method: 'DELETE' });

export const startSession = (sessionId: string) =>
  request<any>(`/sessions/${sessionId}/start`, { method: 'POST' });

export const pauseSession = (sessionId: string) =>
  request<any>(`/sessions/${sessionId}/pause`, { method: 'POST' });

export const resumeSession = (sessionId: string) =>
  request<any>(`/sessions/${sessionId}/resume`, { method: 'POST' });

export const resetSession = (sessionId: string) =>
  request<any>(`/sessions/${sessionId}/reset`, { method: 'POST' });

// Alert confirmations
export const confirmAlert = (sessionId: string, playerId: string, alertId: string, alertType: string) =>
  request<any>(`/sessions/${sessionId}/confirm-alert`, {
    method: 'POST',
    body: JSON.stringify({ playerId, alertId, alertType }),
  });

// Analytics
export const getSessionAnalytics = (sessionId: string) =>
  request<any>(`/analytics/sessions/${sessionId}`);

export const getAnalyticsSummary = () => request<any>('/analytics/summary');
