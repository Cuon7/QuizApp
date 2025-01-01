import { faEdit, faTrash, faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { EnumHelper } from "../../helpers/enum.helper";

interface TablePaginationProps {
    data: any[];
    defaultOrderBy: string;
    columns: any[];
    onEdit: (item: any) => void;
    onDelete: (item: any) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({ data, defaultOrderBy, columns, onEdit, onDelete }) => {
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(5);
    const [orderBy, setOrderBy] = useState<string>(defaultOrderBy);
    const [orderDirection, setOrderDirection] = useState<number>(0);
    const [pageLimit] = useState<number>(3);
    const [pageSizeList] = useState<number[]>([1, 5, 10, 20, 50, 100]);

    const sortedData = [...data].sort((a, b) => {
        if (a[orderBy] < b[orderBy]) return orderDirection === 0 ? -1 : 1;
        if (a[orderBy] > b[orderBy]) return orderDirection === 0 ? 1 : -1;
        return 0;
    });

    const paginatedData = sortedData.slice((page - 1) * size, page * size);

    const calculatePage = () => {
        const totalPages = Math.ceil(data.length / size);
        const start: number = Math.max(1, page - pageLimit);
        const end: number = Math.min(totalPages, page + pageLimit);

        const pageList: number[] = [];
        for (let i = start; i <= end; i++) {
            pageList.push(i);
        }
        return pageList;
    };

    const orderByField = (field: string) => {
        setOrderBy(field);
        setOrderDirection(orderBy === field && orderDirection === 1 ? 0 : 1);
    };

    return (
        <div className="card border border-slate-300 rounded-md my-4">
            <div className="card-body p-3 border-y border-slate-300">
                <table className="w-full">
                    <thead>
                        <tr className="*:border *:border-slate-300 *:p-3">
                            <th>No</th>
                            {columns.map((column: any) => (
                                <th key={column.field}>
                                    {column.sortabled ? (
                                        <button type="button" onClick={() => orderByField(column.field)}>
                                            {column.label}
                                            <FontAwesomeIcon icon={orderDirection === 1 && orderBy === column.field ? column.iconASC : column.iconDESC} className="ml-2" />
                                        </button>
                                    ) : column.label}
                                </th>
                            ))}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length !== 0 && paginatedData.map((item, index) => (
                            <tr key={item.id} className="*:border *:border-slate-300 *:p-3">
                                <td>
                                    {index + 1}
                                </td>
                                {columns.map((column: any) => (
                                    <td key={column.field}>
                                        {column.isURL ? (
                                            <img 
                                                src = {`../../assets/${item[column.field]}`}
                                                // src={`../../${item[column.field]}`} 
                                                // alt={column.label} 
                                                className="w-16 h-16 object-cover" 
                                                
                                            />
                                        ) : column.field === 'isActive' ? 
                                            (item[column.field] ? 'Yes' : 'No') : column.isEnum ? 
                                            EnumHelper.getDisplayValue(column.enum, item[column.field]) : item[column.field]}
                                    </td>
                                ))}
                                <td>
                                    <div className="flex justify-center space-x-3">
                                        <button type="button" title="Edit" onClick={() => onEdit(item)}>
                                            <FontAwesomeIcon icon={faEdit} className="text-blue-500" />
                                        </button>
                                        <button type="button" title="Delete" onClick={() => onDelete(item)}>
                                            <FontAwesomeIcon icon={faTrash} className="text-red-500" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {
                            data.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="text-2xl font-bold text-center">No data</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className="card-footer p-3 flex justify-between">
                <div className="select-page-size flex items-center">
                    <label htmlFor="pageSize" className="block mr-2">Items per page: </label>
                    <select name="pageSize" id="pageSize" onChange={(e) => setSize(parseInt(e.target.value))} value={size} title="Select Page Size"
                        className="p-2 border border-slate-300 rounded-sm">
                        {pageSizeList.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </div>
                <div className="list-page flex items-center space-x-3">
                    <button type="button" disabled={page === 1} onClick={() => setPage(1)} title="First Page"
                        className={`w-8 h-8 flex justify-center items-center rounded-full border border-slate-300 ${page === 1 ? 'cursor-not-allowed' : ''}`}>
                        <FontAwesomeIcon icon={faAngleDoubleLeft} className={page === 1 ? 'text-slate-400' : 'text-blue-500'} />
                    </button>
                    <button type="button" disabled={page === 1} onClick={() => setPage(page - 1)} title="Previous Page"
                        className={`w-8 h-8 flex justify-center items-center rounded-full border border-slate-300 ${page === 1 ? 'cursor-not-allowed' : ''}`}>
                        <FontAwesomeIcon icon={faAngleLeft} className={page === 1 ? 'text-slate-400' : 'text-blue-500'} />
                    </button>

                    {calculatePage().map((item) => (
                        <button key={item} type="button" onClick={() => setPage(item)} title={`Page ${item}`}
                            className={`w-8 h-8 flex justify-center items-center rounded-full border border-slate-300 text-blue-500 ${page === item ? 'bg-blue-500 text-white' : ''}`}>
                            {item}
                        </button>
                    ))}

                    <button type="button" disabled={page === Math.ceil(data.length / size)} onClick={() => setPage(page + 1)} title="Next Page"
                        className={`w-8 h-8 flex justify-center items-center rounded-full border border-slate-300 ${page === Math.ceil(data.length / size) ? 'cursor-not-allowed' : ''}`}>
                        <FontAwesomeIcon icon={faAngleRight} className={page === Math.ceil(data.length / size) ? 'text-slate-400' : 'text-blue-500'} />
                    </button>
                    <button type="button" disabled={page === Math.ceil(data.length / size)} onClick={() => setPage(Math.ceil(data.length / size))} title="Last Page"
                        className={`w-8 h-8 flex justify-center items-center rounded-full border border-slate-300 ${page === Math.ceil(data.length / size) ? 'cursor-not-allowed' : ''}`}>
                        <FontAwesomeIcon icon={faAngleDoubleRight} className={page === Math.ceil(data.length / size) ? 'text-slate-400' : 'text-blue-500'} />
                    </button>
                </div>
                <div className="page-info">
                    {data.length > 0 && `${(page - 1) * size + 1}-${Math.min(page * size, data.length)} of ${data.length}`}
                </div>
            </div>
        </div>
    );
};

export default TablePagination;