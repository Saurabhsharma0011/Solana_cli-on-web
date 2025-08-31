// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  method?: string;
  message?: string;
  requestBody?: Record<string, unknown>;
  timestamp?: string;
  name?: string;
  error?: string;
  [key: string]: unknown;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Get the current timestamp
  const timestamp = new Date().toISOString();
  
  // Handle different HTTP methods
  switch (req.method) {
    case 'GET':
      res.status(200).json({ 
        method: 'GET',
        message: 'Hello from Nex4 API',
        timestamp,
      });
      break;
    
    case 'POST':
      // Return the posted data along with a response
      res.status(200).json({ 
        method: 'POST',
        message: 'Data received successfully',
        requestBody: req.body,
        timestamp,
      });
      break;
    
    default:
      // Handle any other HTTP method
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ 
        error: `Method ${req.method} Not Allowed`,
        timestamp, 
      });
  }
}
