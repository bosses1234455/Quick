import { mongooseConnect } from './mongoose';

export function withDB(handler) {
  return async (req, res) => {
    try {
      await mongooseConnect();
      return await handler(req, res);
    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Database connection failed' });
    }
  };
}