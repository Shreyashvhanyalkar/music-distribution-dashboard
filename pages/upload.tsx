import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import TrackForm from '../components/TrackForm';

const Upload: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
    }
  }, [router]);

  const handleSubmit = async (trackData: any) => {
    try {
      // Add current date if not provided
      if (!trackData.releaseDate) {
        trackData.releaseDate = new Date().toISOString().split('T')[0];
      }
      
      const response = await fetch('/api/tracks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trackData),
      });

      if (!response.ok) {
        throw new Error('Failed to upload track');
      }

      const result = await response.json();
      console.log('Track uploaded successfully:', result);

      // Redirect to dashboard on success
      router.push('/dashboard');
    } catch (error) {
      console.error('Error uploading track:', error);
      alert('Failed to upload track. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Upload New Track</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <TrackForm onSubmit={handleSubmit} />
        </div>
      </div>
    </Layout>
  );
};

export default Upload;