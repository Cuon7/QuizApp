import React from 'react';
import { useLocation } from 'react-router-dom';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

const QuizPage: React.FC = () => {
  const location = useLocation();
  const { title, questions }: { title: string; questions: Question[] } = location.state || {};

  const [answers, setAnswers] = React.useState<Record<number, string>>({});

  const handleAnswerChange = (questionId: number, selectedAnswer: string) => {
    setAnswers({ ...answers, [questionId]: selectedAnswer });
  };

  const handleSubmit = () => {
    const score = questions.filter(
      (q) => answers[q.id] === q.answer
    ).length;
    alert(`Your score is ${score} out of ${questions.length}`);
    console.log(`Your score is ${score} out of ${questions.length}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-3xl">
        <h3 className="text-2xl font-bold mb-4 text-center">{title}</h3>
        <form>
          {questions.map((question) => (
            <div key={question.id} className="mb-4">
              <p className="font-semibold">{question.question}</p>
              <div className="mt-2">
                {question.options.map((option, index) => (
                  <label key={index} className="block">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={() => handleAnswerChange(question.id, option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </form>
        <div className="flex justify-center mt-4">
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-md"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
