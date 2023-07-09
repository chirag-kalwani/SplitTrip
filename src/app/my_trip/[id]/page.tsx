'use client'
import React, {useEffect, useState} from 'react';
import FreindsList from "@/components/Trip/FreindsList";
import PayTo from "@/components/Trip/PayTo";
import TakeFrom from "@/components/Trip/TakeFrom";
import axios from "axios";
import Pay from "@/components/Modals/Pay";
import {id} from "postcss-selector-parser";

function MyTrip({params}: any) {

    // tripId is the id of the trip which user have clicked
    const tripId = params.id;
    // members is the list of all the members in the trip
    const [members, setMembers] = useState<any[]>([]);
    // owner is the user who have created the trip
    const [owner, setOwner] = useState<any>({});
    // pay is the state which is used to show the pay modal where user do entry of the payment done by him
    const [pay, setPay] = useState<boolean>(false);

    const [payTo, setPayTo] = useState<any[]>([]);
    const [takeFrom, setTakeFrom] = useState<any[]>([]);

    async function getPayTo() {
        try {
            const res = await axios.post('/api/trip/getPayTo', {tripId});
            const to = [], from = [];
            for (let d of res.data.data) {
                if (d.receiver._id === d.trip.payerId && d.trip.payerId === d.trip.receiverId) continue;
                if (d.trip.amount > 0) {
                    to.push({
                        userName: d.receiver.userName,
                        amount: d.trip.amount,
                        fullName: d.receiver.firstName + " " + d.receiver.lastName,
                        email: d.receiver.email,
                    })
                } else if (d.trip.amount < 0) {
                    from.push({
                        userName: d.receiver.userName,
                        amount: -d.trip.amount,
                        fullName: d.receiver.firstName + " " + d.receiver.lastName,
                        email: d.receiver.email,
                    })
                }
            }
            setPayTo(to);
            setTakeFrom(from);
        } catch (e: any) {
            console.log("Error in getPayTo: ", e.message);
        }
    }

    useEffect(() => {
        // getUsers is the function which is used to get all the users from the tripId
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

        getUsers().then(() => getPayTo());
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            <h3 className="mt-10">Created By: {owner.firstName + " " + owner.lastName} </h3>

            {/* The Button Clicked open the pay modal */}
            <button onClick={() => setPay(prev => !prev)}
                    className="relative inline-flex items-center justify-center mt-5 p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                  <span
                      className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Pay Now
                  </span>
            </button>

            {/*Either pay modal remains open or dahboard */}
            {pay ?
                <Pay tripId={tripId} members={members} handleClose={setPay}/> :
                <div className="flex flex-row flex-wrap">
                    {/*Members in The trip shown in by the following component*/}
                    <FreindsList members={members}/>
                    {/* Current user pending payments */}
                    <PayTo payTo={payTo}/>
                    <TakeFrom takeFrom={takeFrom}/>
                </div>
            }
        </div>
    );
}

export default MyTrip;