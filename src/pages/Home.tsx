import React, { useCallback, useEffect, useState } from 'react';
import QuizCard from '../shared/components/QuizCard';
import { useNavigate } from 'react-router-dom';
import { QuizService } from '../services/quiz.service';
const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/quizzes');
  };
  const [quizData, setQuizData] = useState<any>([]);
  
  const fetchQuizData = useCallback(async () => {
          try {
              const response: any = await QuizService.getAll();
  
              if (response) {
                  setInterval(() => {
                      setLoading(false);
                  }, 0);
              }
  
              setQuizData(response);
          } catch (error) {
              console.error('Error:', error);
          }
      }, []);

  useEffect(() => {
    // Fetch the quiz data when the component mounts
    fetchQuizData();
  }, []);
  return (
    <div>
      {/* Hero Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          {/* Left Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-4">Welcome to Quiz App</h1>
            <p className="text-lg text-gray-600 mb-6">
            Text here for testing
            </p>
            <button onClick={handleNavigate} className="bg-blue-500 text-white px-6 py-2 rounded-md">Take a Quiz</button>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
            <img
              src={require('../assets/images/quiz-bg-01.jpeg')} // Replace with your actual image path
              alt="Quiz Hero"
              className="rounded-lg max-w-full"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
      <h2 className="text-center text-3xl font-bold mb-6">QUIZZES</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      {quizData?.map((quiz: any, index: any) => (
       <QuizCard
       id={quiz.id}
       key={quiz.id}
       title={quiz.title}
       description={quiz.description}
       duration={quiz.duration}
       image={quiz.thumbnailUrl ? require(`../assets/images/${quiz.thumbnailUrl}`) : null}
       questions={quiz.questions}
     />
      ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
