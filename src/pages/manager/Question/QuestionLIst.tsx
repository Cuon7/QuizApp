import { faEraser, faPlus, faSearch, faSortAlphaAsc, faSortAlphaDesc, faSortAmountAsc, faSortAmountDesc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, useState } from "react";
import TablePagination from "../../../core/components/TablePagination";
import { QuizService } from "../../../services/quiz.service";
import Loading from "../../../core/components/Loading";
import { TableColumnModel } from "../../../models/table-column.model";
import { QuizViewModel } from "../../../view-models/quiz/quiz.view-model";
import { PageInfo } from "../../../models/page-info.model";
import QuesionDetail from "./QuestionDetail";
import { QuestionService } from "../../../services/question.service";
import { QuestionType } from "../../../enums/question-type.enum";

function QuestionList() {
    const [data, setData] = useState<QuizViewModel[]>([]);
    const [keyword, setKeyword] = useState<string>('');
    const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(5);
    const [orderBy, setOrderBy] = useState<string>('name');
    const [orderDirection, setOrderDirection] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    const [columns] = useState<TableColumnModel[]>([
        { field: 'content', label: 'Content', iconASC: faSortAmountAsc, iconDESC: faSortAmountDesc, isEnum: false, enum: null, sortabled: false },
        { field: 'questionType', label: 'Question Type', iconASC: faSortAlphaAsc, iconDESC: faSortAlphaDesc, isEnum: true, enum: QuestionType, sortabled: false },
        { field: 'numberOfAnswers', label: 'Number Of Answers', iconASC: faSortAlphaAsc, iconDESC: faSortAlphaDesc, isEnum: false, enum: null, sortabled: false },
        { field: 'isActive', label: 'Active', iconASC: faSortAlphaAsc, iconDESC: faSortAlphaDesc, isEnum: false, enum: null, sortabled: false },        
    ]);

    const detailForm = useRef<HTMLDivElement>(null);

    const searchData = useCallback(async () => {
        try {
            const response: any = await QuestionService.getAll();

            if (response) {
                setInterval(() => {
                    setLoading(false);
                }, 0);
            }

            setData(response);
        } catch (error) {
            console.error('Error:', error);
        }
    }, [page, size, orderBy, orderDirection, keyword]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        searchData();
    };

    const onCreate = () => {
        setIsShowDetail(false);
        setSelectedItem(null);
        setTimeout(() => {
            setIsShowDetail(true);
            // Auto focus on detail form
            detailForm.current?.scrollIntoView({ behavior: 'smooth' });
        });
    };

    const onEdit = (item: any) => {
        setIsShowDetail(false);
        setSelectedItem(item);
        setTimeout(() => {
            setIsShowDetail(true);
            // Auto focus on detail form
            detailForm.current?.scrollIntoView({ behavior: 'smooth' });
        });
    }

    const onDelete = async (item: any) => {
        let response: any;
        try {
            response = await QuizService.remove(item.id);
        } catch (error) {
            console.error('Error:', error);
        }

        if (response.status === 200 && response.data) {
            searchData();
        }
    };

    const onCancelDetail = () => {
        setIsShowDetail(false);
        setSelectedItem(null);
        searchData();
    };

    // Call API from BE => setData(response.data);
    useEffect(() => {
        searchData();
    }, [size, page, orderBy, orderDirection, searchData]);

    if (loading) return <Loading />;

    return (
        <section className="w-full">
            {/* Search */}
            <div className="card border border-slate-300 rounded-md">
                <div className="card-header p-3">
                    <h1 className="text-2xl font-semibold">Question Management</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    {/* <div className="card-body p-3 border-y border-slate-300"> */}
                        {/* <div className="form-group">
                            <label htmlFor="name" className="block mb-3">Keyword</label>
                            <input type="text" id="name" name="name" onChange={(e) => setKeyword(e.target.value)}
                                className="p-2 border border-slate-300 rounded-sm w-full" />
                        </div> */}
                    {/* </div> */}
                    <div className="card-footer p-3 flex justify-between">
                        <button type="button" className="p-2 px-4 bg-green-500 text-white hover:bg-green-700 rounded-full" onClick={onCreate}>
                            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Create
                        </button>
                        {/* <div className="search-actions space-x-3">
                            <button type="reset" className="p-2 px-4 bg-slate-300 text-white hover:bg-slate-500 rounded-full">
                                <FontAwesomeIcon icon={faEraser} className="mr-2" /> Clear
                            </button>
                            <button type="submit" className="p-2 px-4 bg-blue-500 text-white hover:bg-blue-700 rounded-full">
                                <FontAwesomeIcon icon={faSearch} className="mr-2" /> Search
                            </button>
                        </div> */}
                    </div>
                </form>
            </div>

            {/* Table List With Paging */}
            <TablePagination data={data} defaultOrderBy={'name'} columns={columns} onEdit={onEdit} onDelete={onDelete} />

             {/* Details Component */}
            <div id="detail-form" ref={detailForm}>
                {isShowDetail && (<QuesionDetail item={selectedItem} onCancel={() => onCancelDetail()} />)}
            </div>
        </section>
    );
}

export default QuestionList;