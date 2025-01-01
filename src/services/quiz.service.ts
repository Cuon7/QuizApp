import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL + 'quizzes',
    headers: {
        'Content-Type': 'application/json', // Explicitly set JSON
      },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const getAll = async () => {
    try {
        const response = await api.get('/');
        return response.data;
    } catch (error) {
        console.log('Error:', error);
    }
};

const getById = async (id: string) => {
    try {
        const response: any = await api.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
    }
};

// const search = async (filter: any) => {
//     try {
//         const response: any = await api.get('/search', { params: filter });
//         return response.data;
//     } catch (error) {
//         console.log('Error:', error);
//     }
// }

const create = async (data: any) => {
    try {
        const response: any = await api.post('/', data);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
    }
}

const update = async (id: string, data: any) => {
    try {
        const response: any = await api.put(`/${id}`, data);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
    }
}

const remove = async (id: string) => {
    try {
        const response: any = await api.delete<boolean>(`/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
    }
}

const prepareQuiz = async (data: any) => {
    try {
        const response : any = await api.post('prepareQuizForUser', data)
        return response;
    } catch (error) {
        console.log('Error:', error);
    }
}

const takeQuiz = async (data: any) => {
    try {
        const response : any = await api.post('takeQuiz', data)
        return response;
    } catch (error) {
        console.log('Error:', error);
    }
}

const submitQuiz = async (data: any) => {
    try {
        const response : any = await api.post('submitQuiz', data)
        return response;
    } catch (error) {
        console.log('Error:', error);
    }
}

export const QuizService = {
    getAll,
    getById,
    // search,
    create,
    update,
    remove,
    prepareQuiz,
    takeQuiz,
    submitQuiz
}