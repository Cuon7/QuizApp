import { faFacebook, faLinkedin, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faLocationDot, faMailBulk, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React from 'react';

const Contact: React.FC = () => {
    const initialValues = {
        name: "",
        email: "",
        message: "",
    }
    const onSubmit = async (values: any) => {
        console.log(values)
    }
    return (
        <div className="flex flex-col min-h-screen">
            <h3 className="text-center text-2xl font-bold mb-4">CONTACT</h3>
            {/* Main Content */}
            <main className="flex-grow container mx-auto p-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Feedback Form */}
                    <div className="w-full md:w-1/2">
                        <h2 className="text-2xl font-bold mb-4">Feedback</h2>
                        <p className="mb-4">
                            Please fill out the form below to send us your feedback. We will get
                            back to you as soon as possible.
                        </p>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={onSubmit}
                            validate={(values) => {
                                const errors: Record<string, string> = {};
                                if (!values.name) {
                                    errors.name = "Name is required.";
                                }
                                if (!values.email) {
                                    errors.email = "Email is required.";
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                                ) {
                                    errors.email = "Invalid email address.";
                                }
                                if (!values.message) {
                                    errors.message = "Message is required.";
                                }
                                return errors;
                            }}
                        >
                            {() => (
                                <Form className="space-y-4">
                                    <div>
                                        <label className="block font-bold mb-1">Name</label>
                                        <Field
                                            type="text"
                                            name="name"
                                            placeholder="Enter your name"
                                            className="w-full border rounded p-2"
                                        />
                                        <ErrorMessage
                                            name="name"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-bold mb-1">Email</label>
                                        <Field
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            className="w-full border rounded p-2"
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-bold mb-1">Message</label>
                                        <Field
                                            as="textarea"
                                            name="message"
                                            placeholder="Enter your message"
                                            className="w-full border rounded p-2 h-24"
                                        />
                                        <ErrorMessage
                                            name="message"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                                    >
                                        Send
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>

                    {/* Contact Information */}
                    <div className="w-full md:w-1/2">
                        <h2 className="text-2xl font-bold mb-4">Our Information</h2>
                        <p className="mb-4">
                            We are always here to help you. You can contact us through the
                            following ways.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center">
                                <a
                                    href="mailto:cuon7.work@gmail.com"
                                    className="text-blue-600 hover:underline"
                                >
                                    <FontAwesomeIcon icon={faMailBulk} className="mr-2" />
                                    cuon7.work@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center">
                                <a href="tel:+84961326300" className="text-blue-600 hover:underline">
                                    <FontAwesomeIcon icon={faPhone} className="mr-2" />
                                    +84 961 326 300
                                </a>
                            </li>
                            <li className="flex items-center">
                                <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                                70 Ngoc Ha, Ba Dinh, Ha Noi, Viet Nam
                            </li>
                        </ul>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="text-2xl text-black hover:text-blue-600"><FontAwesomeIcon icon={faTiktok} /></a>
                            <a href="#" className="text-2xl text-black hover:text-blue-600"><FontAwesomeIcon icon={faFacebook} /></a>
                            <a href="#" className="text-2xl text-black hover:text-blue-600"><FontAwesomeIcon icon={faYoutube} /></a>
                            <a href="#" className="text-2xl text-black hover:text-blue-600"><FontAwesomeIcon icon={faLinkedin} /></a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Contact;
