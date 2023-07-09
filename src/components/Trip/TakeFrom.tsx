import React from 'react';
import Spinner from "@/components/Spinners/Spinner";

function TakeFrom({takeFrom, loading}: any) {
    return (
        <div className="m-20">
            <h1>Take from: </h1>
            {loading && <div className="my-3">
                <Spinner/>
            </div>}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead
                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Freind Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Update Amount
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        takeFrom.map((pay: any, i: number) => {
                            return (
                                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={i}>
                                    <th scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {pay.userName}
                                    </th>
                                    <td className="px-6 py-4">
                                        Rs. {pay.amount}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Update
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TakeFrom;