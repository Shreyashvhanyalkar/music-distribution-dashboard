import type { NextApiRequest, NextApiResponse } from 'next';
import { Track } from '../../../types';

// In a real app, this would be a database
import { tracksStore } from '../tracks';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    // Find the track by ID (ensure id is a string)
    const track = tracksStore.find(t => t.id === String(id));

    if (track) {
      return res.status(200).json(track);
    } else {
      return res.status(404).json({ message: 'Track not found' });
    }
  }

  // Method not allowed
  res.setHeader('Allow', ['GET']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
