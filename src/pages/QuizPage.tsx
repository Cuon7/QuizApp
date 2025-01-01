import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { QuizService } from '../services/quiz.service';

interface Question {
  id: string;
  content: string;
  answers: { id: string; content: string }[];
}

interface Quiz {
  id: string;
  title: string;
  duration: number;
  questions: Question[];
  quizCode: string;
}

const QuizPage: React.FC = () => {
  const location = useLocation();
  const { id, userId }: { id: string; userId: string } = location.state || {};

  const [quizCode, setQuizCode] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submissionStatus, setSubmissionStatus] = useState<string>('');
  let finishLoading = false;

  const prepareAndFetchQuiz = async () => {
    try {
      const prepareResponse = await QuizService.prepareQuiz({
        quizId: id,
        userId: userId,
        quizCode: null,
      });

      if (prepareResponse?.data?.quizCode) {
        setQuizCode(prepareResponse?.data?.quizCode);

        const takeQuizResponse = await QuizService.takeQuiz({
          quizId: id,
          userId: userId,
          quizCode: prepareResponse?.data?.quizCode,
        });

        setQuiz(takeQuizResponse.data);
      } else {
        console.error('Failed to retrieve quiz code.');
      }
    } catch (error) {
      console.error('Error preparing or taking the quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id && userId && finishLoading == false) {
      prepareAndFetchQuiz();
      finishLoading = true;
    }
  }, []);

  const handleAnswerChange = (questionId: string, answerId: string) => {
    setAnswers({ ...answers, [questionId]: answerId });
  };

  const handleSubmit = async () => {
    try {
      const response = await QuizService.submitQuiz({
        quizId: quiz?.id,
        userId: userId,
        quizCode: quiz?.quizCode,
        userAnswers: Object.entries(answers).map(([questionId, answerId]) => ({
          questionId,
          answerId,
        })),
      });
      console.log('Quiz submitted successfully:', response);
      setSubmissionStatus('Quiz submitted successfully');
    } catch (error) {
      console.error('Error submitting the quiz:', error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!quiz) {
    return <div className="flex items-center justify-center min-h-screen">Quiz not found.</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-3xl">
        <h3 className="text-2xl font-bold mb-4 text-center">{quiz.title}</h3>
        <form>
          {quiz.questions.map((question) => (
            <div key={question.id} className="mb-4">
              <p className="font-semibold">{question.content}</p>
              <div className="mt-2">
                {question.answers.map((answer) => (
                  <label key={answer.id} className="block">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={answer.id}
                      checked={answers[question.id] === answer.id}
                      onChange={() => handleAnswerChange(question.id, answer.id)}
                      className="mr-2"
                    />
                    {answer.content}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </form>

        {submissionStatus && (
          <div className="text-green-500 text-center mt-4">
            {submissionStatus}
          </div>
        )}

        <div className="flex justify-center mt-4">
          <button
            type="button"
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
