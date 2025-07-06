import { mongooseConnect } from './mongoose';
import { NextResponse } from 'next/server';

export function withDB(handler) {
  return async (req, res) => {
    try {
      await mongooseConnect();
      return await handler(req, res);
    } catch (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }
  };
}