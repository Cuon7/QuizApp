import React, { useEffect, useState } from 'react';
import QuizCard from '../shared/components/QuizCard';
// Call api here later
const fetchQuizData = async () => {
  return [
    {
      title: "Capitals of Country",
      description: "Test your knowledge of country capitals",
      duration: 15,
      image: require('../assets/images/map.jpeg'),
    },
    {
      title: "Capitals of Country",
      description: "Test your knowledge of country capitals",
      duration: 15,
      image: require('../assets/images/inventions.png'),
    },
    {
      title: "Capitals of Country",
      description: "Test your knowledge of country capitals",
      duration: 15,
      image: require('../assets/images/capitals.jpeg'),
    },
  ];
};

const Home: React.FC = () => {
  const [quizData, setQuizData] = useState<any>([]);

  useEffect(() => {
    // Fetch the quiz data when the component mounts
    fetchQuizData().then(data => setQuizData(data));
  }, []);
  // const quizData: any = [
  //   {
  //     title: "Capitals of Country",
  //     description: "Test your knowledge of country capitals",
  //     duration: 15,
  //     image: require('../assets/images/map.jpeg'),
  //   },
  //   {
  //     title: "Capitals of Country",
  //     description: "Test your knowledge of country capitals",
  //     duration: 15,
  //     image: require('../assets/images/inventions.png'),
  //   },
  //   {
  //     title: "Capitals of Country",
  //     description: "Test your knowledge of country capitals",
  //     duration: 15,
  //     image: require('../assets/images/capitals.jpeg'),
  //   },
  // ];
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
            <button className="bg-blue-500 text-white px-6 py-2 rounded-md">Take a Quiz</button>
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
          key={index} // Unique key for each item in the list
          title={quiz.title}
          description={quiz.description}
          duration={quiz.duration}
          image={quiz.image}
        />
      ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
