import { faEraser, faRotateLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RoleViewModel } from "../../../view-models/user/role.view-model";
import { RoleService } from "../../../services/role.service";

function RoleDetail({ item, onCancel }: { item: RoleViewModel; onCancel: any }) {

    const formik = useFormik({
        initialValues: {
            name: item ? item.name : "",
            description: item ? item.description : "",
            isActive: item ? item.isActive : true,
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("First Name is required")
                .min(3, "First Name must be at least 3 characters")
                .max(50, "Content must be at most 50 characters"),
                description: Yup.string()
                .required("First Name is required")
                .min(3, "First Name must be at least 3 characters")
                .max(50, "Content must be at most 50 characters"),
            isActive: Yup.boolean().required("Active is required").default(true),
        }),
        onSubmit: async (values) => {
            let response: any;
            if (item) {
                response = await RoleService.update(item.id, values);
            } else {
                response = await RoleService.create(values);
            }

            if (response) {
                onCancel();
            } else {
                console.error("Error:", response);
            }
        },
    });

    return (
        <div className="w-full mb-64">
            <div className="card border border-slate-300 rounded-md">
                <div className="card-header p-3">
                    <h2 className="text-xl font-semibold">{item ? "Edit" : "Create"} User</h2>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="card-body p-3 border-y border-slate-300 flex flex-wrap">
                        {/* Name */}
                        <div className="form-group w-1/2 p-2">
                            <label htmlFor="name" className="block mb-3">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                className="p-2 border border-slate-300 rounded-sm w-full"
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="text-red-500">{formik.errors.name}</div>
                            ) : null}
                        </div>

                        {/* Description */}
                        <div className="form-group w-1/2 p-2">
                            <label htmlFor="description" className="block mb-3">Description</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}
                                className="p-2 border border-slate-300 rounded-sm w-full"
                            />
                            {formik.touched.description && formik.errors.description ? (
                                <div className="text-red-500">{formik.errors.description}</div>
                            ) : null}
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

export default RoleDetail;
