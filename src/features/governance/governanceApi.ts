// governanceApi.ts
// Stewards Council and reserve governance API
// Connects to: GET /api/governance/reserve, GET /api/governance/council

export const getReserveStatus = async () => {
  const res = await fetch('/api/governance/reserve');
  if (!res.ok) throw new Error('Failed to fetch reserve status');
  return res.json();
};

export const getCouncilStatus = async () => {
  const res = await fetch('/api/governance/council');
  if (!res.ok) throw new Error('Failed to fetch council status');
  return res.json();
};
