'use client'
import React, {useEffect} from 'react';
import FreindsList from "@/components/Trip/FreindsList";
import PayTo from "@/components/Trip/PayTo";
import TakeFrom from "@/components/Trip/TakeFrom";
import axios from "axios";

function MyTrip({params}: any) {
    const id = params.id;
    const [members, setMembers] = React.useState<any[]>([]);
    useEffect(() => {
        async function getUsers() {
            try {
                const res = await axios.post("/api/trip/getUsersFromTripId", {tripId: id});
                setMembers(res.data.data);
            } catch (e: any) {
                console.log("Error While Fetching users from tripId: ", e);
            }
        }

        getUsers().then();
    }, []);

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row flex-wrap">
                <FreindsList members={members}/>
                <PayTo/>
                <TakeFrom/>
            </div>
        </div>
    );
}

export default MyTrip;