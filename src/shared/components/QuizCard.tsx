import React, { useEffect, useState } from 'react';
import Quizzes from './Quizzes';
import { useNavigate } from 'react-router-dom';

interface QuizCardProps {
  id: any;
  title: string;
  description: string;
  duration: number;
  image: string;
  questions: []
}

const QuizCard: React.FC<QuizCardProps> = ({ id, title, description, duration, image }) => {
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    const userInformation = localStorage.getItem('userInformation');
    if (userInformation) {
      try {
        const user = JSON.parse(JSON.parse(userInformation));
        setUserId(user.id);
      } catch (error) {
        console.error('Error parsing user information:', error);
      }
    }
  }, []);
  const navigate = useNavigate();
  const formatDuration = (mins: number) => {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return hours ? `${hours}h${minutes > 0 ? `${minutes}m` : ''}` : `${minutes}m`;
  };

  const handleQuizSelect = () => {
    navigate('/quiz/' + id, { state: { id, userId } });
  };

  return (
    <div className="border rounded-lg shadow-lg p-4">
      <img src={image} alt={title} className="rounded-md mb-4" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{formatDuration(duration)}</span>
        <button onClick={handleQuizSelect} className="bg-blue-500 text-white px-4 py-1 rounded-md">
          Start
        </button>
      </div>
    </div>
  );
};


export default QuizCard;
