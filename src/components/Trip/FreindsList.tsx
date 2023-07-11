import React from 'react';
import Spinner from "@/components/Spinners/Spinner";

function FreindsList({members, loading}: any) {
    return (
        <div className="">
            <h1>Freinds In this Trip</h1>
            {loading && <div className="my-3">
                <Spinner/>
            </div>}
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead
                    className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Freind Name
                    </th>
                </tr>
                </thead>
                <tbody>
                {members.map((member: any, i: number) => (
                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={i}>
                        <th scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {member.userName}
                        </th>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default FreindsList;