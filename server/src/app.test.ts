import { once } from 'node:events';
import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { afterAll, beforeAll, expect, test } from 'vitest';
import { app } from './app.ts';

let server: Server;
let baseUrl: string;

// Nyalakan server di port acak supaya tidak bentrok dengan `npm run dev`.
beforeAll(async () => {
  server = app.listen(0);
  await once(server, 'listening');
  baseUrl = `http://localhost:${(server.address() as AddressInfo).port}`;
});

afterAll(() => {
  server.close();
});

test('GET /api/v1/health menjawab { data: { ok: true } }', async () => {
  const res = await fetch(`${baseUrl}/api/v1/health`);

  expect(res.status).toBe(200);
  expect(await res.json()).toEqual({ data: { ok: true } });
});
