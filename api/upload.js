export default async function handler(req, res) {
  // For Vercel deployment, we'd proxy to your deployed backend
  // Or deploy backend separately (see Option B/C)
  res.status(200).json({ message: "API endpoint" })
}
