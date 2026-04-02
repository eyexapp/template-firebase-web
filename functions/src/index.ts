import { onRequest } from 'firebase-functions/v2/https';

export const healthcheck = onRequest((_, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
