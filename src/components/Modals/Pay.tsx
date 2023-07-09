'use client';
import React, {useState} from 'react';
import Input from "@/components/Inputs/Input";
import Alert from "@/components/Alert/Alert";
import axios from "axios";

function Pay({members, handleClose, tripId}: any) {
    // state: equalShare keep track of checkbox
    const [equalShare, setEqualShare] = useState(true);
    // state: err keep track of error
    const [err, setErr] = useState({is: false, msg: ""});

    // function update placeholder of share input
    function func() {
        if (equalShare) return 'Disabled';
        return '0';
    }

    // check if number is valid
    function checkNumber(num: any) {
        if (isNaN(num)) {
            setErr({is: true, msg: "Price must be a number: " + num});
            return false;
        }
        if (num < 0) {
            setErr({is: true, msg: "Price must be a positive number: " + num});
            return false;
        }
        return true;
    }

    // get details from form
    function getDetails(e: any): any {
        e.preventDefault();
        let price = e.target.form[0].value;
        if (!checkNumber(price)) return false;
        let data: any = {
            price: e.target.form[0].value * 1,
        }
        if (e.target.form[1].checked === true) {
            const p = data.price / members.length;
            for (let i = 0; i < members.length; i++) {
                data[members[i]._id] = p;
            }
        } else {
            let sum = 0;
            for (let i = 0; i < members.length; i++) {
                let val = e.target.form[i + 2].value;
                let share = 0;
                if (val !== "") share = val * 1;
                if (!checkNumber(share)) return false;
                sum += share;
                data[members[i]._id] = share;
            }
            if (sum !== data.price) {
                setErr({is: true, msg: `Sum of shares must be equal to price: ${sum} is Not equal to ${data.price}`});
                return false;
            }
        }
        const retData = [];
        for (let i = 0; i < members.length; i++) {
            retData.push({userId: members[i]._id, share: data[members[i]._id]});
        }
        return retData;
    }

    // save data to server
    async function handleChange(e: any) {
        const data: any = getDetails(e);
        if (data === false) return;
        try {
            await axios.post('/api/trip/payments/addPayment', {data: data, tripId: tripId});
            handleClose(false);
        } catch (err: any) {
            console.log(err.message);
            setErr({is: true, msg: err.message});
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-0 backdrop-blur-sm flex justify-center items-center">
            <div className='w-[750px]'>
                <div className='bg-gray-900 p-2'>
                    <form action="#">
                        <Input label={"Enter Price"} type={"text"} id={"price"} placeholder={"price"}/>
                        <div className="flex items-center mt-10">
                            <input id="default-checkbox" type="checkbox" value={""} checked={equalShare}
                                   onChange={() => {
                                       setEqualShare(prev => !prev)
                                   }}
                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor="default-checkbox"
                                   className="ml-2 text-xl font-medium text-gray-900 dark:text-gray-300">Equal
                                Share</label>
                        </div>
                        {members.map((member: any, i: number) => (
                            <div className="m-5" key={i}>
                                <Input disabled={equalShare}
                                       label={`Share of ${member.userName}`}
                                       type={"text"}
                                       id={"price"} placeholder={func()}/>
                            </div>
                        ))}
                        {err.is && <Alert err={err} closeFunction={setErr}/>}
                        <div className="flex justify-around">
                            <button onClick={handleChange}
                                    className="relative inline-flex items-center justify-center mt-10  px-5 py-2.5  p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                Pay
                            </button>
                            <button onClick={() => handleClose(false)}
                                    className="relative inline-flex items-center justify-center mt-10 p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                                  <span
                                      className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                     Cancel
                                  </span>
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default Pay;