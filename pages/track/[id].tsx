import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { Track } from '../../types';
import { format } from 'date-fns';

const TrackDetail: React.FC = () => {
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
      return;
    }

    // Fetch track details when ID is available
    if (id) {
      const fetchTrack = async () => {
        try {
          // Use the dedicated API endpoint for individual tracks
          const response = await fetch(`/api/tracks/${id}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch track details');
          }
          
          const data = await response.json();
          setTrack(data);
        } catch (err) {
          console.error('Error fetching track:', err);
          setError('Error loading track details. Please try again.');
        } finally {
          setLoading(false);
        }
      };

      fetchTrack();
    }
  }, [id, router]);

  const handleBack = () => {
    router.push('/dashboard');
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </Layout>
    );
  }

  if (error || !track) {
    return (
      <Layout>
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
          {error || 'Track not found'}
        </div>
        <button
          onClick={handleBack}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
        >
          Back to Dashboard
        </button>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-4">
        <button
          onClick={handleBack}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-indigo-600 p-6">
          <h1 className="text-2xl font-bold text-white">{track.title}</h1>
          <p className="text-indigo-100 text-lg">{track.artist}</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-4 text-gray-700">Track Details</h2>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Genre</p>
                  <p className="font-medium">{track.genre}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Release Date</p>
                  <p className="font-medium">{format(new Date(track.releaseDate), 'MMMM d, yyyy')}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    track.status === 'Published' 
                      ? 'bg-green-100 text-green-800' 
                      : track.status === 'Pending' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {track.status}
                  </span>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Track ID</p>
                  <p className="font-medium">{track.id}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">Distribution Info</h2>
              <p className="text-gray-600 mb-4">
                This track is currently {track.status.toLowerCase()} and available for distribution.
              </p>
              
              {track.status === 'Published' ? (
                <div className="bg-green-50 p-3 rounded-md">
                  <p className="text-green-700 text-sm">
                    This track is live and available on all platforms.
                  </p>
                </div>
              ) : track.status === 'Pending' ? (
                <div className="bg-yellow-50 p-3 rounded-md">
                  <p className="text-yellow-700 text-sm">
                    This track is pending review and will be distributed soon.
                  </p>
                </div>
              ) : (
                <div className="bg-gray-100 p-3 rounded-md">
                  <p className="text-gray-700 text-sm">
                    This track is in draft mode and not yet submitted for distribution.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TrackDetail;