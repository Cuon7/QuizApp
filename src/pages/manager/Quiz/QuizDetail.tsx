import React, { useEffect, useState } from "react";
import { faEraser, faRotateLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import * as Yup from "yup";
import { QuizService } from "../../../services/quiz.service";
import { QuestionService } from "../../../services/question.service"; // Import QuestionService
import { QuizViewModel } from "../../../view-models/quiz/quiz.view-model";

function QuizDetail({ item, onCancel }: { item: QuizViewModel; onCancel: any }) {
    const [questions, setQuestions] = useState([]); // Store all questions fetched from the API
    const [questionIdWithOrders, setQuestionIdWithOrders] = useState<any[]>([]); // Manage questionId and order pairs

    // Fetch all questions and the current quiz's questions
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                // Fetch all available questions
                const allQuestions = await QuestionService.getAll();
                setQuestions(allQuestions || []);

                // Fetch questions currently associated with the quiz
                if (item?.id) {
                    const currentQuestions = await QuestionService.getQuestionsByQuizId(item.id);
                    const formattedQuestions = currentQuestions.map((q: any, index: number) => ({
                        QuestionId: q.id,
                        Order: q.order || index + 1, // Assign the existing order or a default
                    }));
                    setQuestionIdWithOrders(formattedQuestions);
                }
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchQuestions();
    }, [item]);

    const formik = useFormik({
        initialValues: {
            title: item ? item.title : "",
            description: item ? item.description : "",
            questionIdWithOrders: questionIdWithOrders, // Bind selected questions with orders
            duration: item ? item.duration : 0,
            isActive: item ? item.isActive : true,
            thumbnailUrl: item ? item.thumbnailUrl : "",
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .required("Title is required")
                .min(3, "Title must be at least 3 characters")
                .max(50, "Title must be at most 50 characters"),
            description: Yup.string()
                .required("Description is required")
                .max(500, "Description must be at most 500 characters"),
            duration: Yup.number()
                .required("Duration is required")
                .min(0, "Duration must be greater than or equal to 0"),
            isActive: Yup.boolean().required("Active is required").default(true),
        }),
        onSubmit: async (values) => {
            const payload = { ...values, questionIdWithOrders }; // Include selected questions with orders
            let response: any;
            if (item) {
                response = await QuizService.update(item.id, payload);
            } else {
                response = await QuizService.create(payload);
            }

            if (response) {
                onCancel();
            } else {
                console.error("Error:", response);
            }
        },
    });

    // Handle question selection
    const handleQuestionSelection = (questionId: string) => {
        const existingIndex = questionIdWithOrders.findIndex((q) => q.QuestionId === questionId);

        if (existingIndex !== -1) {
            // If the question is already selected, remove it
            setQuestionIdWithOrders(
                questionIdWithOrders.filter((q) => q.QuestionId !== questionId)
            );
        } else {
            // Add new question with default order
            setQuestionIdWithOrders([
                ...questionIdWithOrders,
                { QuestionId: questionId, Order: questionIdWithOrders.length + 1 },
            ]);
        }
    };

    // Handle order change
    const handleOrderChange = (questionId: string, newOrder: number) => {
        setQuestionIdWithOrders(
            questionIdWithOrders.map((q) =>
                q.QuestionId === questionId ? { ...q, Order: newOrder } : q
            )
        );
    };

    return (
        <div className="w-full mb-64">
            <div className="card border border-slate-300 rounded-md">
                <div className="card-header p-3">
                    <h2 className="text-xl font-semibold">{item ? "Edit" : "Create"} Quiz</h2>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="card-body p-3 border-y border-slate-300 flex flex-wrap">
                        {/* Title */}
                        <div className="form-group w-1/2 p-2">
                            <label htmlFor="title" className="block mb-3">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.title}
                                className="p-2 border border-slate-300 rounded-sm w-full"
                            />
                            {formik.touched.title && formik.errors.title ? (
                                <div className="text-red-500">{formik.errors.title}</div>
                            ) : null}
                        </div>

                        {/* Duration */}
                        <div className="form-group w-1/2 p-2">
                            <label htmlFor="duration" className="block mb-3">Duration</label>
                            <input
                                type="number"
                                id="duration"
                                name="duration"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.duration}
                                className="p-2 border border-slate-300 rounded-sm w-full"
                            />
                            {formik.touched.duration && formik.errors.duration ? (
                                <div className="text-red-500">{formik.errors.duration}</div>
                            ) : null}
                        </div>

                        {/* Question List */}
                        <div className="form-group w-full p-2">
                            <label htmlFor="questions" className="block mb-3">Questions</label>
                            <div className="border border-slate-300 rounded-sm p-2 max-h-64 overflow-y-auto">
                                {questions.map((question: any) => {
                                    const selectedQuestion = questionIdWithOrders.find(
                                        (q) => q.QuestionId === question.id
                                    );

                                    return (
                                        <div key={question.id} className="flex items-center mb-2">
                                            <input
                                                type="checkbox"
                                                id={`question-${question.id}`}
                                                checked={!!selectedQuestion}
                                                onChange={() => handleQuestionSelection(question.id)}
                                                className="mr-2"
                                            />
                                            <label htmlFor={`question-${question.id}`} className="cursor-pointer flex-grow">
                                                {question.content}
                                            </label>
                                            {selectedQuestion && (
                                                <input
                                                    type="number"
                                                    className="border border-slate-300 rounded-sm w-16 ml-2"
                                                    value={selectedQuestion.Order}
                                                    onChange={(e) =>
                                                        handleOrderChange(question.id, Number(e.target.value))
                                                    }
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="form-group w-full p-2">
                            <label htmlFor="description" className="block mb-3">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}
                                className="p-2 border border-slate-300 rounded-sm w-full"
                            ></textarea>
                            {formik.touched.description && formik.errors.description ? (
                                <div className="text-red-500">{formik.errors.description}</div>
                            ) : null}
                        </div>
                    </div>

                    <div className="form-group w-1/2 p-2">
                            <label htmlFor="isActive" className="block mb-3">Active</label>
                            <input type="checkbox" id="isActive" name="isActive"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                checked={formik.values.isActive}
                                className="p-2 border border-slate-300 rounded-sm" />
                            {formik.touched.isActive && formik.errors.isActive ? (
                                <div className="text-red-500">{typeof formik.errors.isActive === 'string' ? formik.errors.isActive : ''}</div>
                            ) : null}
                        </div>

                    <div className="card-footer p-3 flex justify-between">
                        <button
                            type="button"
                            className="p-2 px-4 bg-slate-200 hover:bg-slate-300 rounded-full"
                            onClick={onCancel}
                        >
                            <FontAwesomeIcon icon={faRotateLeft} className="mr-2" /> Cancel
                        </button>
                        <div className="search-actions space-x-3">
                            <button
                                type="reset"
                                className="p-2 px-4 bg-slate-300 text-white hover:bg-slate-500 rounded-full"
                                onClick={formik.handleReset}
                            >
                                <FontAwesomeIcon icon={faEraser} className="mr-2" /> Clear
                            </button>
                            <button
                                type="submit"
                                className="p-2 px-4 bg-blue-500 text-white hover:bg-blue-700 rounded-full"
                            >
                                <FontAwesomeIcon icon={faSearch} className="mr-2" /> Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default QuizDetail;
