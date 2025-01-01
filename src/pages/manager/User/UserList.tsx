import { faEraser, faPlus, faSearch, faSortAlphaAsc, faSortAlphaDesc, faSortAmountAsc, faSortAmountDesc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, useState } from "react";
import TablePagination from "../../../core/components/TablePagination";
import Loading from "../../../core/components/Loading";
import { TableColumnModel } from "../../../models/table-column.model";
import { PageInfo } from "../../../models/page-info.model";
import UserDetail from "./UserDetail";
import { UserService } from "../../../services/user.service";
import { UserViewModel } from "../../../view-models/user/user.view-model";

function UserList() {
    const [data, setData] = useState<UserViewModel[]>([]);
    const [keyword, setKeyword] = useState<string>('');
    const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(5);
    const [orderBy, setOrderBy] = useState<string>('name');
    const [orderDirection, setOrderDirection] = useState<number>(0);
    const [pageInfo, setPageInfo] = useState<PageInfo>(new PageInfo());
    const [loading, setLoading] = useState(true);

    const [columns] = useState<TableColumnModel[]>([
        { field: 'firstName', label: 'First Name', iconASC: faSortAlphaAsc, iconDESC: faSortAlphaDesc, isEnum: false, enum: null, sortabled: false, },
        { field: 'lastName', label: 'Last Name', iconASC: faSortAlphaAsc, iconDESC: faSortAlphaDesc, isEnum: false, enum: null, sortabled: false },
        { field: 'email', label: 'Email', iconASC: faSortAmountAsc, iconDESC: faSortAmountDesc, isEnum: false, enum: null, sortabled: false },
        { field: 'userName', label: 'User Name', iconASC: faSortAlphaAsc, iconDESC: faSortAlphaDesc, isEnum: false, enum: null, sortabled: false },
        { field: 'phoneNumber', label: 'Phone Nymber', iconASC: faSortAlphaAsc, iconDESC: faSortAlphaDesc, isEnum: false, enum: null, sortabled: false },
        { field: 'isActive', label: 'Active', iconASC: faSortAlphaAsc, iconDESC: faSortAlphaDesc, isEnum: false, enum: null, sortabled: false },        
    ]);

    const detailForm = useRef<HTMLDivElement>(null);

    const searchData = useCallback(async () => {
        try {
            const response: any = await UserService.getAll();

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

    const onSearch = (page: number, size: number, orderBy: string, orderDirection: number) => {
        setPage(page);
        setSize(size);
        setOrderBy(orderBy);
        setOrderDirection(orderDirection);
    }

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
            response = await UserService.remove(item.id);
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
                    <h1 className="text-2xl font-semibold">Quiz Management</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="card-footer p-3 flex justify-between">
                        <button type="button" className="p-2 px-4 bg-green-500 text-white hover:bg-green-700 rounded-full" onClick={onCreate}>
                            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Create
                        </button>
                    </div>
                </form>
            </div>

            {/* Table List With Paging */}
            <TablePagination data={data} defaultOrderBy={'name'} columns={columns} onEdit={onEdit} onDelete={onDelete} />

             {/* Details Component */}
            <div id="detail-form" ref={detailForm}>
                {isShowDetail && (<UserDetail item={selectedItem} onCancel={() => onCancelDetail()} />)}
            </div>
        </section>
    );
}

export default UserList;