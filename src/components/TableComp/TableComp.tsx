'use client'
import React, {useState} from 'react';

function TableComp({d}: any) {
    const [open, setOpen] = useState(false);
    const customFormat = (date: Date) => {
        let hours = date.getHours();
        let minutes: string | number = date.getMinutes();
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const amPm = hours >= 12 ? 'PM' : 'AM';
        return hours + ':' + minutes + ' ' + amPm;
    };

    function formatDate(date: Date) {
        return date.toLocaleDateString([], {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: undefined,
            minute: undefined,
            second: undefined,
        })
    }

    return (
        <div>
            <h2>
                <button type="button" onClick={() => setOpen(prev => !prev)}
                        className="flex justify-between items-center w-full md:flex-row flex-col p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    <span>
                        On <span className="text-xl"> {formatDate(new Date(d.createdAt))} </span>
                        at <span className="text-xl"> {customFormat(new Date(d.createdAt))}, </span>
                        <span className="text-xl"> {d.payer.userName} </span>
                        pays Rs <span className="text-xl">  {d.amount} </span>
                    </span>
                    {open ? <svg className="invert" xmlns="http://www.w3.org/2000/svg"
                                 width="24" height="24">
                            <path
                                d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z"/>
                        </svg> :
                        <svg className="invert" xmlns="http://www.w3.org/2000/svg"
                             width="24" height="24">
                            <path
                                d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/>
                        </svg>
                    }
                </button>
                {
                    open &&
                    <>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead
                                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    User Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Amount
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                d.receivers.map((r: any, i: number) => (
                                    <tr key={i}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {r.receiver.userName}
                                        </th>
                                        <td className="px-6 py-4">
                                            {r.amount} Rs
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </>
                }
            </h2>
        </div>
    );
}

export default TableComp;