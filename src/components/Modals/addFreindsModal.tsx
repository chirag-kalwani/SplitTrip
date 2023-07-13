"use client";
import React, {useState} from 'react';
import Input from "@/components/Inputs/Input";
import axios from "axios";
import Alert from "@/components/Alert/Alert";
import Spinner from "@/components/Spinners/Spinner";

function AddFreindsModal({closeModal, tripId}: any) {

    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<any>({is: false, msg: ""});

    async function handleSubmit(e: any) {
        try {
            setLoading(true);
            const res = await axios.post("/api/trip/joinTrip", {
                uName: e.target.form[0].value,
                tripId: tripId,
                isOwner: false
            });
            console.log("res: ", res.data)
            closeModal(false);
        } catch (e: any) {
            console.log("Error while adding freind: ", e);
            setErr({is: true, msg: "Either Server is Down Or You entered wrong userName"});
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-5 bg-black bg-opacity-0 backdrop-blur-sm flex justify-center items-center">
            <div style={{width: "100vw"}}>
                <div className='bg-gray-900 w-full p-2 flex flex-col justify-center items-center gap-10'>
                    <div onClick={() => closeModal(false)} className="relative text-4xl text-red-500 cursor-pointer">
                        <button type="button"
                                className="rounded-md p-2 inline-flex items-center justify-center text-red-600 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    <form>
                        <div style={{width: "50vw"}}>
                            <Input label="userName" type={"text"} id={"userName"} placeholde={"Enter userName"}/>
                        </div>
                        {
                            loading ?
                                <Spinner/>
                                :
                                <button type="button" onClick={handleSubmit}
                                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm mt-10 px-5 py-2.5 text-center mr-2 mb-2">Add
                                </button>

                        }
                    </form>
                    <Alert err={err} closeFunction={setErr}/>
                </div>
            </div>
        </div>
    );
}

export default AddFreindsModal;