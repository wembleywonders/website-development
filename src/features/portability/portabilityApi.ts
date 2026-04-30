// portabilityApi.ts
// Subscriber consent and portability API
// Connects to: GET /api/portability/subscribers, POST /api/portability/consent

export const getSubscriberConsents = async (creatorId: string) => {
  const res = await fetch('/api/portability/subscribers/' + creatorId, {
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ww_token') }
  });
  if (!res.ok) throw new Error('Failed to fetch subscriber consents');
  return res.json();
};
