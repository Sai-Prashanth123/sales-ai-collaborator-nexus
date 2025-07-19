// Simple test endpoint for debugging Vercel deployment
module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  res.json({
    message: 'API Test Endpoint Working!',
    method: req.method,
    url: req.url,
    query: req.query,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
}; 