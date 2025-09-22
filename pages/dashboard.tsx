import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import TrackTable from '../components/TrackTable';
import SearchBar from '../components/SearchBar';
import { Track } from '../types';

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to fetch tracks
  const fetchTracks = async () => {
    try {
      const response = await fetch('/api/tracks');
      if (!response.ok) {
        throw new Error('Failed to fetch tracks');
      }
      const data = await response.json();
      setTracks(data);
      setFilteredTracks(data);
    } catch (err) {
      setError('Error loading tracks. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
      return;
    }

    // Fetch tracks
    fetchTracks();
  }, [router]);
  
  // Refresh tracks when navigating back to dashboard
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url === '/dashboard') {
        fetchTracks();
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // Filter tracks based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredTracks(tracks);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = tracks.filter(
        track => 
          track.title.toLowerCase().includes(term) || 
          track.artist.toLowerCase().includes(term)
      );
      setFilteredTracks(filtered);
    }
  }, [searchTerm, tracks]);

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Track Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Manage your music distribution</p>
      </div>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-md">
          {error}
        </div>
      ) : filteredTracks.length === 0 ? (
        <div className="bg-yellow-50 dark:bg-gray-700 p-4 rounded-md text-center">
          <p className="text-yellow-700 dark:text-yellow-300">No tracks found matching your search criteria.</p>
        </div>
      ) : (
        <TrackTable tracks={filteredTracks} />
      )}
    </Layout>
  );
};

export default Dashboard;