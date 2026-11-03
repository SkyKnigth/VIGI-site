const API_URL = import.meta.env.VITE_API_URL || '/api';

export async function getContent(type) {
  const response = await fetch(`${API_URL}/content?type=${encodeURIComponent(type)}`);
  if (!response.ok) throw new Error('Impossible de charger les publications.');
  return response.json();
}

export async function sendContact(payload) {
  const response = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Envoi impossible.');
  return result;
}
