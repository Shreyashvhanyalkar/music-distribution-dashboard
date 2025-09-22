import { NextApiRequest, NextApiResponse } from 'next';
import { Track } from '../../types';

// Default mock data
const defaultTracks: Track[] = [
  {
    id: "1",
    title: "Summer Vibes",
    artist: "DJ Sunshine",
    releaseDate: "2025-06-15",
    genre: "Pop",
    status: "Published"
  },
  {
    id: "2",
    title: "Midnight Dreams",
    artist: "Luna Eclipse",
    releaseDate: "2025-07-22",
    genre: "R&B",
    status: "Pending"
  },
  {
    id: "3",
    title: "Electric Soul",
    artist: "Voltage Crew",
    releaseDate: "2025-08-10",
    genre: "Electronic",
    status: "Published"
  },
  {
    id: "4",
    title: "Mountain High",
    artist: "Nature Sounds",
    releaseDate: "2025-09-05",
    genre: "Ambient",
    status: "Draft"
  },
  {
    id: "5",
    title: "Urban Jungle",
    artist: "City Beats",
    releaseDate: "2025-10-18",
    genre: "Hip Hop",
    status: "Published"
  }
];

// Helper function to get tracks (would be replaced by a real database in production)
function getTracks(): Track[] {
  // In a real app, this would be a database call
  // For this mock, we'll simulate persistence with a global variable
  return defaultTracks;
}

// Global variable to store tracks (simulating a database)
export let tracksStore = [...defaultTracks];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle GET request for a specific track by ID
  if (req.method === 'GET' && req.query.id) {
    const track = tracksStore.find(t => t.id === req.query.id);
    if (track) {
      return res.status(200).json(track);
    } else {
      return res.status(404).json({ message: 'Track not found' });
    }
  }
  
  // Handle GET request for all tracks
  if (req.method === 'GET') {
    return res.status(200).json(tracksStore);
  } 
  
  // Handle POST request to add a new track
  if (req.method === 'POST') {
    const track = req.body;
    
    // Ensure all required fields are present
    if (!track.title || !track.artist || !track.genre) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Generate a new ID (simple implementation)
    const newId = (tracksStore.length + 1).toString();
    const newTrack: Track = {
      id: newId,
      title: track.title,
      artist: track.artist,
      releaseDate: track.releaseDate || new Date().toISOString().split('T')[0],
      genre: track.genre,
      status: "Pending" // Default status for new tracks
    };
    
    tracksStore.push(newTrack);
    return res.status(201).json(newTrack);
  }
  
  // Method not allowed
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}