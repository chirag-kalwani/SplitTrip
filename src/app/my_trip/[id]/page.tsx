'use client'
import React, {useEffect, useState} from 'react';
import FreindsList from "@/components/Trip/FreindsList";
import PayTo from "@/components/Trip/PayTo";
import TakeFrom from "@/components/Trip/TakeFrom";
import axios from "axios";
import Pay from "@/components/Modals/Pay";

function MyTrip({params}: any) {
    const tripId = params.id;
    const [members, setMembers] = useState<any[]>([]);
    const [owner, setOwner] = useState<any>({});
    const [pay, setPay] = useState<boolean>(false);
    useEffect(() => {
        async function getUsers() {
            try {
                const res = await axios.post("/api/trip/getUsersFromTripId", {tripId: tripId});
                const userDetails = res.data.data.map((user: any) => {
                    if (user.isOwner) setOwner(user._doc);
                    return user._doc
                });
                setMembers(userDetails);
            } catch (e: any) {
                console.log("Error While Fetching users from tripId: ", e);
            }
        }

        getUsers().then();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            <h3 className="mt-10">Created By: {owner.firstName + " " + owner.lastName} </h3>
            <button onClick={() => setPay(prev => !prev)}
                    className="relative inline-flex items-center justify-center mt-5 p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                  <span
                      className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Pay Now
                  </span>
            </button>
            {pay ?
                <Pay members={members} handleClose={setPay}/> :
                <div className="flex flex-row flex-wrap">
                    <FreindsList members={members}/>
                    <PayTo/>
                    <TakeFrom/>
                </div>
            }
        </div>
    );
}

export default MyTrip;