// pardnerApi.ts
// Cultivation Pardner API service
// Connects to: GET /api/pardner/eligibility, GET /api/pardner/queue, POST /api/pardner/apply

export interface PardnerEligibility {
  isEligible: boolean;
  quarterlyEarningsAverage: number;
  quartersReceived: number;
  quartersRemaining: number;
  queuePosition?: number;
  activityScore?: number;
}

export const getPardnerEligibility = async (creatorId: string): Promise<PardnerEligibility> => {
  const res = await fetch('/api/pardner/eligibility/' + creatorId, {
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('ww_token') }
  });
  if (!res.ok) throw new Error('Failed to fetch Pardner eligibility');
  return res.json();
};

export const getPardnerQueue = async () => {
  const res = await fetch('/api/pardner/queue');
  if (!res.ok) throw new Error('Failed to fetch Pardner queue');
  return res.json();
};
