"use client"
import React, {useState} from 'react';
import Input from "@/components/Inputs/Input";
import Spinner from "@/components/Spinners/Spinner";
import axios from "axios";
import Alert from "@/components/Alert/Alert";
import Link from "next/link";
import {Tooltip} from "react-tooltip";
import AddFreindsModal from "@/components/Modals/addFreindsModal";

function CreateTrip({params}: any) {
    // tripId is the id of the trip which user have Created and he is owner of this trip
    const [tripId, setTripId] = useState<string>("");
    // loading is the state which is used to show the loading spinner
    const [loading, setLoading] = useState<boolean>(false);
    // err is the state which is used to show the error alert
    const [err, setErr] = useState<any>({is: false, msg: ""});
    const [changeCopy, setChangeCopy] = useState(false);

    const [showModal, setShowMadal] = useState(false);

    const userName = params.userName;
    // handleSubmit is the function which is used to create the trip
    // It also set the tripId state, User use this tripId to add other freinds.


    async function handlCopy() {
        setChangeCopy(true);
        try {
            await navigator.clipboard.write([
                new ClipboardItem({
                    "text/plain": new Blob([tripId], {type: "text/plain"}),
                }),
            ]);
            await setTimeout(() => {
                setChangeCopy(false);
            }, 500);
        } catch (error) {
            console.error("Failed to copy text to clipboard:", error);
        }
    }

    async function handleSubmit(e: any) {
        try {
            setLoading(true);
            const data: any = {
                tripName: e.target.form[0].value,
                tripDescription: e.target.form[1].value,
                tripLocation: e.target.form[2].value
            }
            if (data.tripName === "" || data.tripDescription === "" || data.tripLocation === "") {
                setErr({is: true, msg: "All fields are required"});
            }
            const res = await axios.post("/api/trip/createTrip", data);
            // Now he is owner of this trip so we will also add this trip and userId into Linking table: LinkTrip
            await axios.post("/api/trip/joinTrip", {tripId: res.data.savedTrip._id, isOwner: true});
            setTripId(res.data.savedTrip._id);
        } catch (e: any) {
            setErr({is: true, msg: "Request Failed, Either Server is Down Or Choose unique Trip Name"});
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Link href="/"
                  className="absolute top-2 right-5 inline-flex items-center justify-center mt-5 p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500   dark:text-white">
                          <span
                              className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md">
                              {userName}
                          </span>
            </Link>
            <div className="mt-28 w-full flex flex-wrap justify-center items-center">
                <form className="w-96 p-5">
                    <div className="mt-4">
                        <Input label={"Trip Name"} type={"text"} id={"tripName"} placeholder={"Enter Name of Trip"}/>
                    </div>
                    <div className="mt-4">
                        <Input label={"Trip Description"} type={"text"} id={"tripDescription"}
                               placeholder={"Enter Description of Trip"}/>
                    </div>
                    <div className="mt-4">
                        <Input label={"Trip Location"} type={"text"} id={"tripLocation"}
                               placeholder={"Enter Location of Trip"}/>
                    </div>
                    {err.is && <Alert err={err} closeFunction={setErr}/>}
                    <div className="mt-8">
                        <button type="button" onClick={handleSubmit}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create
                            Trip
                        </button>
                    </div>
                </form>
                <div className="mt-10">
                    <span className="ml-5">Your Trip ID is: </span>
                    {tripId ?
                        <div className="flex gap-5">
                            <span className="text-blue-700"> {tripId} </span>
                            <div data-tooltip-id="copy" data-tooltip-content={"Copy"}>
                                {
                                    !changeCopy ?
                                        <svg onClick={() => handlCopy()} className="w-6 invert cursor-pointer"
                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path
                                                d="M21 10v10a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1zM6 14H5V5h9v1a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h2a1 1 0 0 0 0-2z"/>
                                        </svg> :
                                        <Spinner/>
                                }
                            </div>
                            <Tooltip clickable place={"right"} style={{cursor: "pointer"}}
                                     id="copy"/>
                        </div> :
                        loading ?
                            <Spinner/> :
                            <span className="text-red-700 ml-5 mt-2">No Trip ID</span>
                    }
                    <div>
                        {
                            tripId &&
                            <div>

                                <ul>
                                    <li className="text-blue-700 ml-5 mt-2">* Share this ID with your friends</li>
                                    <li className="text-blue-700 ml-5 mt-2">* Your friends can join your trip using this
                                        ID
                                    </li>
                                    <li className="text-blue-700 ml-5 mt-2">* You can also find this id into your trip
                                        section
                                    </li>
                                </ul>
                                <button onClick={() => setShowMadal(true)}
                                        className="relative inline-flex items-center justify-center p-0.5 mt-5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                    <span
                                        className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Add Freinds
                                    </span>
                                </button>
                                {showModal && <AddFreindsModal closeModal={setShowMadal} tripId={tripId}/>}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateTrip;