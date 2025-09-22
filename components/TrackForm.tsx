import React, { useState } from 'react';

interface TrackFormProps {
  onSubmit: (trackData: any) => void;
}

const TrackForm: React.FC<TrackFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [genre, setGenre] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!artist.trim()) newErrors.artist = 'Artist name is required';
    if (!releaseDate) newErrors.releaseDate = 'Release date is required';
    if (!genre.trim()) newErrors.genre = 'Genre is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        title,
        artist,
        releaseDate,
        genre
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Track Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>
      
      <div>
        <label htmlFor="artist" className="block text-sm font-medium text-gray-700 mb-1">
          Artist Name
        </label>
        <input
          type="text"
          id="artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.artist ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.artist && <p className="mt-1 text-sm text-red-600">{errors.artist}</p>}
      </div>
      
      <div>
        <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700 mb-1">
          Release Date
        </label>
        <input
          type="date"
          id="releaseDate"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.releaseDate ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.releaseDate && <p className="mt-1 text-sm text-red-600">{errors.releaseDate}</p>}
      </div>
      
      <div>
        <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
          Genre
        </label>
        <select
          id="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.genre ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select a genre</option>
          <option value="Pop">Pop</option>
          <option value="Rock">Rock</option>
          <option value="Hip Hop">Hip Hop</option>
          <option value="R&B">R&B</option>
          <option value="Electronic">Electronic</option>
          <option value="Jazz">Jazz</option>
          <option value="Classical">Classical</option>
          <option value="Country">Country</option>
          <option value="Folk">Folk</option>
          <option value="Ambient">Ambient</option>
          <option value="Other">Other</option>
        </select>
        {errors.genre && <p className="mt-1 text-sm text-red-600">{errors.genre}</p>}
      </div>
      
      <div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Upload Track
        </button>
      </div>
    </form>
  );
};

export default TrackForm;