import React, { useEffect, useState } from "react";
import { faEraser, faRotateLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import * as Yup from "yup";
import { EnumHelper } from "../../../helpers/enum.helper";
import { QuestionType } from "../../../enums/question-type.enum";
import { UserViewModel } from "../../../view-models/user/user.view-model";
import { UserService } from "../../../services/user.service";

function UserDetail({ item, onCancel }: { item: UserViewModel; onCancel: any }) {

    const formik = useFormik({
        initialValues: {
            firstName: item ? item.firstName : "",
            lastName: item ? item.lastName : "",
            email: item ? item.email : "",
            userName: item ? item.userName : "",
            phoneNumber: item ? item.phoneNumber : "",
            isActive: item ? item.isActive : true,
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .required("First Name is required")
                .min(3, "First Name must be at least 3 characters")
                .max(50, "Content must be at most 50 characters"),
            lastName: Yup.string()
                .required("First Name is required")
                .min(3, "First Name must be at least 3 characters")
                .max(50, "Content must be at most 50 characters"),
            email: Yup.string()
                .required("First Name is required")
                .min(3, "First Name must be at least 3 characters")
                .max(50, "Content must be at most 50 characters"),
            userName: Yup.string()
                .required("First Name is required")
                .min(3, "First Name must be at least 3 characters")
                .max(50, "Content must be at most 50 characters"),
            phoneNumber: Yup.string()
                .required("First Name is required")
                .min(3, "First Name must be at least 3 characters")
                .max(50, "Content must be at most 50 characters"),
            isActive: Yup.boolean().required("Active is required").default(true),
        }),
        onSubmit: async (values) => {
            let response: any;
            if (item) {
                response = await UserService.update(item.id, values);
            } else {
                response = await UserService.create(values);
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
                        {/* First Name */}
                        <div className="form-group w-1/2 p-2">
                            <label htmlFor="firstName" className="block mb-3">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.firstName}
                                className="p-2 border border-slate-300 rounded-sm w-full"
                            />
                            {formik.touched.firstName && formik.errors.firstName ? (
                                <div className="text-red-500">{formik.errors.firstName}</div>
                            ) : null}
                        </div>

                        {/* Last Name */}
                        <div className="form-group w-1/2 p-2">
                            <label htmlFor="lastName" className="block mb-3">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.lastName}
                                className="p-2 border border-slate-300 rounded-sm w-full"
                            />
                            {formik.touched.lastName && formik.errors.lastName ? (
                                <div className="text-red-500">{formik.errors.lastName}</div>
                            ) : null}
                        </div>

                        {/* Email */}
                        <div className="form-group w-1/2 p-2">
                            <label htmlFor="email" className="block mb-3">Email</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className="p-2 border border-slate-300 rounded-sm w-full"
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-red-500">{formik.errors.email}</div>
                            ) : null}
                        </div>

                        {/* User Name */}
                        <div className="form-group w-1/2 p-2">
                            <label htmlFor="userName" className="block mb-3">User Name</label>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.userName}
                                className="p-2 border border-slate-300 rounded-sm w-full"
                            />
                            {formik.touched.userName && formik.errors.userName ? (
                                <div className="text-red-500">{formik.errors.userName}</div>
                            ) : null}
                        </div>

                        {/* Phone Number */}
                        <div className="form-group w-1/2 p-2">
                            <label htmlFor="phoneNumber" className="block mb-3">Phone Number</label>
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phoneNumber}
                                className="p-2 border border-slate-300 rounded-sm w-full"
                            />
                            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                <div className="text-red-500">{formik.errors.phoneNumber}</div>
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

export default UserDetail;
