// simple API route to store consent server-side (append to file or DB)
// In production: validate input, add auth/rate limit, store into DB.
export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  const record = req.body;
  // add server meta
  record.server_ts = new Date().toISOString();
  record.ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  // TODO: persist to DB (example: insert into consents table)
  console.log("CONSENT LOG:", record);
  res.status(200).json({ ok: true });
}
