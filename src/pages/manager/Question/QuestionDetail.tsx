import React, { useEffect, useState } from "react";
import { faEraser, faRotateLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import * as Yup from "yup";
import { QuestionService } from "../../../services/question.service";
import { QuestionViewModel } from "../../../view-models/question/question.view-model";
import { EnumHelper } from "../../../helpers/enum.helper";
import { QuestionType } from "../../../enums/question-type.enum";

function QuestionDetail({ item, onCancel }: { item: QuestionViewModel; onCancel: any }) {

    const formik = useFormik({
        initialValues: {
            content: item ? item.content : "",
            questionType: item ? item.questionType : 0,
            // answers: questionIdWithOrders,
            isActive: item ? item.isActive : true,
        },
        validationSchema: Yup.object({
            content: Yup.string()
                .required("Content is required")
                .min(3, "Content must be at least 3 characters")
                .max(50, "Content must be at most 50 characters"),
            questionType: Yup.string()
                .required("Description is required"),
            isActive: Yup.boolean().required("Active is required").default(true),
        }),
        onSubmit: async (values) => {
            let response: any;
            if (item) {
                response = await QuestionService.update(item.id, values);
            } else {
                response = await QuestionService.create(values);
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
                    <h2 className="text-xl font-semibold">{item ? "Edit" : "Create"} Question</h2>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="card-body p-3 border-y border-slate-300 flex flex-wrap">
                        {/* Content */}
                        <div className="form-group w-1/2 p-2">
                            <label htmlFor="content" className="block mb-3">Content</label>
                            <input
                                type="text"
                                id="content"
                                name="content"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.content}
                                className="p-2 border border-slate-300 rounded-sm w-full"
                            />
                            {formik.touched.content && formik.errors.content ? (
                                <div className="text-red-500">{formik.errors.content}</div>
                            ) : null}
                        </div>

                        {/* Question Type */}
                        <div className="form-group w-1/2 p-2">
                            <label htmlFor="questionType" className="block mb-3">Type</label>
                            <select id="questionType" name="questionType" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.questionType} className="p-2 border border-slate-300 rounded-sm w-full">
                                {EnumHelper.convertEnumToArray(QuestionType).map((type) => (
                                    <option key={type.key} value={type.key}>{type.value}</option>
                                ))}
                            </select>
                            {formik.touched.questionType && formik.errors.questionType ? (
                                <div className="text-red-500">{typeof formik.errors.questionType === 'string' ? formik.errors.questionType : ''}</div>
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

export default QuestionDetail;
