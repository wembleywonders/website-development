import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export interface UseCommunityPoolResult {
  total: number;
  connected: boolean;
  lastUpdatedMs: number | null;
}

export function useCommunityPool(): UseCommunityPoolResult {
  const [total, setTotal] = useState<number>(0);
  const [connected, setConnected] = useState(false);
  const [lastUpdatedMs, setLastUpdatedMs] = useState<number | null>(null);
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(`${API_URL}/ws/auction`),
      connectHeaders: {},
      heartbeatIncoming: 25000,
      heartbeatOutgoing: 25000,
      reconnectDelay: 5000,
      onConnect: () => {
        setConnected(true);
        client.subscribe('/topic/community-pool', (message) => {
          try {
            const data = JSON.parse(message.body);
            setTotal(data.allTimeTotal ?? 0);
            setLastUpdatedMs(data.asOfEpochMs ?? null);
          } catch {
            // malformed
          }
        });
      },
      onDisconnect: () => setConnected(false),
      onStompError: (frame) => {
        console.warn('[CommunityPool] error:', frame.headers['message']);
      },
    });
    client.activate();
    clientRef.current = client;
    return () => { client.deactivate(); clientRef.current = null; };
  }, []);

  return { total, connected, lastUpdatedMs };
}
