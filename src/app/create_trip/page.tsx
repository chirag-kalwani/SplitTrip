"use client"
import {useState} from 'react';
import Input from "@/components/Inputs/Input";
import Spinner from "@/components/Spinners/Spinner";
import Alert from "@/components/Alert/Alert";
import axios from "axios";

function CreateTrip() {
    const [tripId, setTripId] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>({is: false, err: ""});

    async function handleSubmit(e: any) {
        try {
            setLoading(true);
            const data: any = {
                tripName: e.target.form[0].value,
                tripDescription: e.target.form[1].value,
                tripLocation: e.target.form[2].value
            }
            if (data.tripName === "" || data.tripDescription === "" || data.tripLocation === "") {
                setError({is: true, err: "All fields are required"});
                setTimeout(() => {
                    setError({is: false, err: ""});
                }, 2000);
                return;
            }
            const res = await axios.post("/api/trip/createTrip", data);
            // Now he is owner of this trip so we will also add this trip and userId inro Linking table: LinkTrip
            await axios.post("/api/trip/joinTrip", {tripId: res.data.savedTrip._id, isOwner: true});
            setTripId(res.data.savedTrip._id);
        } catch (e: any) {
            setError({is: true, err: "Request Failed, Either Server is Down Or Choose unique Trip Name"});
            setTimeout(() => {
                setError({is: false, err: ""});
            }, 5000);
        } finally {
            setLoading(false);
            e.target.form.reset();
        }
    }

    return (
        <div>
            {error.is && <Alert msg={error.err}/>}
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
                    <div className="mt-8">
                        <button type="button" onClick={handleSubmit}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create
                            Trip
                        </button>
                    </div>
                </form>
                <p className="mt-10">
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
                </p>
            </div>
        </div>
    );
}

export default CreateTrip;