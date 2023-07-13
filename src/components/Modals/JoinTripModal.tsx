"use client";
import {useState} from 'react';
import axios from "axios";
import Alert from "@/components/Alert/Alert";

function JoinTripModal({show, setShow, loadUpperPage}: any) {
    const [err, setErr] = useState({is: false, msg: ""});

    if (!show) return null;

    async function handleSubmit(e: any) {
        // Implement Join Trip Backend
        const tripId = e.target.form[0].value;
        if (!tripId) {
            setErr({is: true, msg: "Trip ID cannot be empty"});
            return;
        }
        try {
            const res = await axios.post('/api/trip/joinTrip', {tripId, isOwner: false});
            setShow(false);
            loadUpperPage((prev: any) => !prev);
        } catch (e: any) {
            setErr({is: true, msg: "Either Trip ID is wrong or you are already a member of this trip"});
        }
    }

    return (
        <div className="fixed inset-5 bg-black bg-opacity-0 backdrop-blur-sm flex justify-center items-center">
            <div className='w-[1000px]'>
                <div className='bg-gray-900 p-2'>
                    <form>
                        <div className="relative z-0">
                            <input type="text" id="trip-id"
                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                   placeholder=" "/>
                            <label htmlFor="trip-id"
                                   className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter
                                Trip ID</label>
                        </div>
                        {err.is && <Alert err={err} closeFunction={setErr}/>}
                        <div className='flex justify-between mt-7'>
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

export default JoinTripModal;