import React, { useEffect, useState } from 'react';
import QuizCard from '../../shared/components/QuizCard';
import { useNavigate } from 'react-router-dom';
// Call api here later
const fetchQuizData = async () => {
    return [
        {
            id: 1,
            title: "Capitals of Country",
            description: "Test your knowledge of country capitals",
            duration: 15,
            image: require('../../assets/images/map.jpeg'),
            questions: [
                { id: 1, question: 'Question 1?', options: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'], answer: 'Answer 1' },
                { id: 2, question: 'Question 1?', options: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'], answer: 'Answer 2' },
            ],
        },
        {
            id: 2,
            title: "Capitals of Country",
            description: "Test your knowledge of country capitals",
            duration: 15,
            image: require('../../assets/images/inventions.png'),
            questions: [
                { id: 1, question: 'Question 1?', options: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'], answer: 'Answer 1' },
                { id: 2, question: 'Question 1?', options: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'], answer: 'Answer 2' },
            ],
        },
        {
            id: 3,
            title: "Capitals of Country",
            description: "Test your knowledge of country capitals",
            duration: 15,
            image: require('../../assets/images/capitals.jpeg'),
            questions: [
                { id: 1, question: 'Question 1?', options: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'], answer: 'Answer 1' },
                { id: 2, question: 'Question 1?', options: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'], answer: 'Answer 2' },
            ],
        },
    ];
};

const Quizzes: React.FC = () => {
    const [quizData, setQuizData] = useState<any[]>([]);
    useEffect(() => {
        // Fetch the quiz data when the component mounts
        fetchQuizData().then(data => setQuizData(data));
    }, []);
    const [inputValue, setInputValue] = useState<string>('');
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
      };
    const choosenQuiz = quizData?.find(a => a.id == inputValue || a.title == inputValue)
    const title = choosenQuiz?.title;
    const questions = choosenQuiz?.questions;
    const navigate = useNavigate();
    const handleNavigate = () => {
        if (choosenQuiz) {
            navigate('/quiz/' + choosenQuiz.id, { state: {title, questions  } });
        }
        else {
            alert("Quiz not found");
        }
        
    };
    

    
    return (
        <div>
            <section className="py-12">
                <div className="max-w-6xl mx-auto flex flex-col items-center">
                    {/* Left Content */}
                    <div className="w-full text-center">
                        <h1 className="text-4xl font-bold mb-4">Take a Quiz</h1>
                        <input
                            type="text"
                            placeholder="Enter quiz code to take a quiz"
                            value={inputValue}
                            onChange={handleInputChange}
                            className="border border-gray-300 p-4 rounded-md mb-4 w-full max-w-lg mx-auto text-xl"
                        />
                        <button
                            onClick={handleNavigate}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md mx-auto text-lg"
                        >
                            Take Quiz
                        </button>
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
                            key={quiz.id} // Unique key for each item in the list
                            title={quiz.title}
                            description={quiz.description}
                            duration={quiz.duration}
                            image={quiz.image}
                            questions={quiz.questions}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Quizzes;
