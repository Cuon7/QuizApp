import React from 'react';

interface QuizCardProps {
  title: string;
  description: string;
  duration: number;
  image: string;
}

const QuizCard: React.FC<QuizCardProps> = ({ title, description, duration, image }) => {
  const formatDuration = (mins: number) => {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return hours ? `${hours}h${minutes > 0 ? `${minutes}m` : ''}` : `${minutes}m`;
  };

  return (
    <div className="border rounded-lg shadow-lg p-4">
      <img src={image} alt={title} className="rounded-md mb-4" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{formatDuration(duration)}</span>
              <button className="bg-blue-500 text-white px-4 py-1 rounded-md">Start</button>
            </div>
    </div>
  );
};


export default QuizCard;
