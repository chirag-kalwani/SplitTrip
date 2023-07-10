'use client'
import React, {useEffect, useState} from 'react';
import TableComp from "@/components/TableComp/TableComp";
import axios from "axios";
import Spinner from "@/components/Spinners/Spinner";


function Table({params}: any) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const tripId = params.id;

    useEffect(() => {
        async function getUsers() {
            try {
                setIsLoading(true);
                let res = await axios.post('/api/trip/paymentDetails', {tripId});
                setData(res.data.data);
            } catch (e: any) {
                console.error("Error While Fetching users from table: ", e);
            } finally {
                setIsLoading(false);
            }
        }

        getUsers().then();
    }, [])


    return (
        <div className="">
            {
                isLoading ? <Spinner/> :
                    data.map((d: any, i) => (
                        <TableComp key={i} d={d}/>
                    ))
            }
        </div>
    );
}

export default Table;