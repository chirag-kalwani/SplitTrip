import React from 'react';
import TexualData from '@/components/TextualData';

function Helper({msg, closeFunction}: any) {
    return (
        <div className="flex-col inset-5 bg-black bg-opacity-0 flex justify-center items-center">
            <div onClick={()=>closeFunction(false)} className="text-4xl text-red-500 cursor-pointer">
                <button type="button"
                        className="rounded-md p-2 inline-flex items-center justify-center text-red-600 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            <div>
                <div className='bg-gray-900 p-2'>
                    {TexualData[msg]}
                </div>
            </div>
        </div>
    );
}

export default Helper;