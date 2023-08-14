"use client";
import React, { useState } from 'react';
import axios from "axios";
import Spinner from "@/components/Spinners/Spinner";

function EditProfileModal({ show, setShow, loadUpperPage }: any) {
    const [loading, setLoading] = useState(false);
    if (!show) return null;
    const convertBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    // The Function Update the User Profile
    async function handleSubmit(e: any) {
        try {
            setLoading(true);
            let base64: any = "";
            if (e.target.form[2].files[0]) {
                base64 = await convertBase64(e.target.form[2].files[0]);
            }
            const data = {
                firstName: e.target.form[0].value,
                lastName: e.target.form[1].value,
                image: base64
            }
            const res = await axios.post('/api/users/update', data);
            if (res.status === 200) {
                setShow(false);
                loadUpperPage((prev: any) => !prev);
            }
        } catch (e: any) {
            console.log("Error While Updating: ", e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-5 bg-black bg-opacity-0 backdrop-blur-sm flex justify-center items-center">
            <div className='w-[1000px]'>
                <div className='bg-gray-900 p-2'>
                    <form className="h-96">
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" name="floating_first_name" id="floating_first_name"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" " required />
                                <label htmlFor="floating_first_name"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First
                                    name</label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" name="floating_last_name" id="floating_last_name"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" " required />
                                <label htmlFor="floating_last_name"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last
                                    name</label>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <label className="block mb-2 text-sm font-medium text-gray-400 dark:text-white"
                                    htmlFor="file_input">Profile Image: </label>
                                <input
                                    className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    id="file_input" type="file" accept="image/*" />
                            </div>
                        </div>

                        {loading && <Spinner />}

                        <div className='flex justify-between'>
                            <button type="button" onClick={handleSubmit}
                                className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-8 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Submit
                            </button>

                            <button type="button" onClick={() => setShow(false)}
                                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-14 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Close
                            </button>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    );
}

export default EditProfileModal;
