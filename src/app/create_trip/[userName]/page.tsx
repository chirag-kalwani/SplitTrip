"use client"
import React, {useState} from 'react';
import Input from "@/components/Inputs/Input";
import Spinner from "@/components/Spinners/Spinner";
import axios from "axios";
import Alert from "@/components/Alert/Alert";
import Link from "next/link";

function CreateTrip({params}: any) {
    // tripId is the id of the trip which user have Created and he is owner of this trip
    const [tripId, setTripId] = useState<string>("");
    // loading is the state which is used to show the loading spinner
    const [loading, setLoading] = useState<boolean>(false);
    // err is the state which is used to show the error alert
    const [err, setErr] = useState<any>({is: false, msg: ""});

    const userName = params.userName;
    // handleSubmit is the function which is used to create the trip
    // It also set the tripId state, User use this tripId to add other freinds.
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
                        <span className="text-blue-700 ml-5 mt-2">{tripId}</span> :
                        loading ? <Spinner/> :
                            <span className="text-red-700 ml-5 mt-2">No Trip ID</span>
                    }
                    <div>
                        {tripId &&
                            <ul>
                                <li className="text-blue-700 ml-5 mt-2">* Share this ID with your friends</li>
                                <li className="text-blue-700 ml-5 mt-2">* Your friends can join your trip using this ID
                                </li>
                                <li className="text-blue-700 ml-5 mt-2">* You can also find this id into your trip
                                    section
                                </li>
                            </ul>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateTrip;