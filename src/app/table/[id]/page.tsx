'use client'
import React, {useEffect, useState} from 'react';
import TableComp from "@/components/TableComp/TableComp";
import axios from "axios";


function Table({params}: any) {
    const [data, setData] = useState([]);
    const tripId = params.id;


    async function getPaymentsDetails(userDetails: any) {
        try {
            let res = await axios.post('/api/trip/paymentDetails', {tripId});
            setData(res.data.data);
        } catch (e: any) {
            console.error("Error in getPayTo: ", e.message);
            return null;
        }
    }

    useEffect(() => {
        async function getUsers() {
            try {
                const res = await axios.post("/api/trip/getUsersFromTripId", {tripId: tripId});
                const userDetails = res.data.data.map((user: any) => {
                    return user._doc
                });
                await getPaymentsDetails(userDetails);
            } catch (e: any) {
                console.error("Error While Fetching users from table: ", e);
            }
        }

        getUsers().then();
    }, [])


    return (
        <div className="">
            {
                data.map((d: any, i) => (
                    <TableComp key={i} d={d}/>
                ))
            }
        </div>
    );
}

export default Table;