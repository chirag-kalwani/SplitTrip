'use client'
import React, {useEffect, useState} from 'react';
import TableComp from "@/components/TableComp/TableComp";
import axios from "axios";
import Spinner from "@/components/Spinners/Spinner";
import Link from "next/link";
import Datepicker from "react-tailwindcss-datepicker";

function Table({params}: any) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userName, setUserName] = useState("");
    const [value, setValue] = useState({
        startDate: new Date('1990-01-01'),
        endDate: new Date()
    });
    const tripId = params.id;


    const handleValueChange = (newValue: any) => {
        let startDate = new Date(newValue.startDate);
        let endDate = new Date(newValue.endDate);
        startDate.setUTCHours(0, 0, 0, 0);
        endDate.setUTCHours(23, 59, 59, 999);
        setValue({startDate, endDate});
    }
    useEffect(() => {
        async function getUsers() {
            try {
                setIsLoading(true);
                let res = await axios.post('/api/trip/paymentDetails', {tripId});
                setUserName(res.data.userName);
                res.data.data.sort(function (a: any, b: any) {
                    // @ts-ignore
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
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
        <div>
            <div className="w-full p-10 mt-10">
                <h2 className="p-2">Select date range: </h2>
                {/*@ts-ignore*/}
                <Datepicker value={value} onChange={handleValueChange}/>
                <p className="text-xs p-0.5">Select two dates from the calendar.</p>
            </div>
            <Link href="/"
                  className="absolute top-2 right-2 inline-flex items-center justify-center mt-2 p-0.5 mb-2 mr-10 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500   dark:text-white">
                {
                    userName === "" ?
                        <span
                            className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md">
                        <Spinner/>
                        </span>
                        :
                        <span
                            className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md">
                              {userName}
                          </span>
                }
            </Link>
            <div>
                {
                    isLoading ? <Spinner/> :
                        <div className="mt-2 p-2">
                            {
                                data.map((d: any, i) => {
                                    if (new Date(d.createdAt) >= value.startDate && new Date(d.createdAt) <= value.endDate)
                                        return <TableComp key={i} d={d}/>
                                    else return <></>
                                })
                            }
                        </div>
                }
            </div>
        </div>
    );
}

export default Table;