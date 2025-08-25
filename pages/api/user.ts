import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  id?: string;
  name?: string;
  status?: string;
  success?: boolean;
  data?: any;
  error?: string;
  timestamp?: string;
  [key: string]: any;
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
      // Simulate fetching a user
      res.status(200).json({ 
        id: "user-123",
        name: "Nex4 User",
        status: "active",
        success: true,
        timestamp,
      });
      break;
    
    case 'POST':
      // Check if required fields are present
      if (!req.body.name) {
        res.status(400).json({
          success: false,
          error: "Missing required fields: name",
          timestamp,
        });
      } else {
        // Simulate creating a user
        res.status(201).json({ 
          success: true,
          data: {
            id: `user-${Math.floor(Math.random() * 1000)}`,
            ...req.body,
            createdAt: timestamp
          },
          message: "User created successfully",
          timestamp,
        });
      }
      break;
    
    default:
      // Handle any other HTTP method
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ 
        success: false,
        error: `Method ${req.method} Not Allowed`,
        timestamp, 
      });
  }
}
