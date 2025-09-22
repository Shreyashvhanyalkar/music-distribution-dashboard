import React from 'react';
import Link from 'next/link';
import { Track } from '../types';
import { format } from 'date-fns';

interface TrackTableProps {
  tracks: Track[];
}

const TrackTable: React.FC<TrackTableProps> = ({ tracks }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="py-3 px-4 text-left font-medium text-gray-600 dark:text-gray-200">Title</th>
            <th className="py-3 px-4 text-left font-medium text-gray-600 dark:text-gray-200">Artist</th>
            <th className="py-3 px-4 text-left font-medium text-gray-600 dark:text-gray-200">Release Date</th>
            <th className="py-3 px-4 text-left font-medium text-gray-600 dark:text-gray-200">Status</th>
            <th className="py-3 px-4 text-left font-medium text-gray-600 dark:text-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {tracks.map((track) => (
            <tr key={track.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">
              <td className="py-3 px-4">{track.title}</td>
              <td className="py-3 px-4">{track.artist}</td>
              <td className="py-3 px-4">
                {format(new Date(track.releaseDate), 'MMM d, yyyy')}
              </td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  track.status === 'Published' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                    : track.status === 'Pending' 
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' 
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }`}>
                  {track.status}
                </span>
              </td>
              <td className="py-3 px-4">
                <Link 
                  href={`/track/${track.id}`}
                  className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrackTable;