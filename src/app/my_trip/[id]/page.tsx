'use client'
import React, {useEffect, useState} from 'react';
import FreindsList from "@/components/Trip/FreindsList";
import axios from "axios";
import Pay from "@/components/Modals/Pay";
import PayTo from "@/components/Trip/PayTo";
import TakeFrom from "@/components/Trip/TakeFrom";
import Helper from "@/components/Modals/Helper";

function MyTrip({params}: any) {
    // States parameters
    // members is the list of all the members in the trip
    const [members, setMembers] = useState<any[]>([]);
    // owner is the user who have created the trip
    const [owner, setOwner] = useState<any>({});
    // pay is the state which is used to show the pay modal where user do entry of the payment done by him
    const [pay, setPay] = useState<boolean>(false);
    // helper is the state which is used to show the helper modal which shows the textual data
    const [helper, setHelper] = useState<boolean>(false);
    // payTo is the list of all the users to whom user have to pay
    const [payTo, setPayTo] = useState<any>([]);
    // takeFrom is the list of all the users from whom user have to take
    const [takeFrom, setTakeFrom] = useState<any[]>([]);
    // Get Current user expenditures
    const [currentUserExpenditures, setCurrentUserExpenditures] = useState<number>(0);
    // isLoading is the state which is used to show the spinner when data is being fetched
    const [userLoading, setUserLoading] = useState<boolean>(false);
    const [tableLoading, setTableLoading] = useState<boolean>(false);
    // loading current page from Pay modal
    const [load, setLoad] = useState(false);
    // tripId is the id of the trip which user have clicked
    const tripId = params.id;
    // getPayTo is the function which is used to get all the users to whom user have to pay and from whom user have to take
    // it is called after all the members are fetched from the tripId

    async function getPaymentsDetails(userDetails: any) {
        try {
            setTableLoading(true);
            let curr = 0;
            let res = await axios.post('/api/trip/paymentDetails', {tripId});
            // currUserId = res.data.userId,
            const pd = res.data.data, currUserName = res.data.userName;
            let arr2: any = {};
            for (let user of userDetails) {
                arr2[user.userName] = {};
                for (let u of userDetails) {
                    arr2[user.userName][u.userName] = 0;
                }
            }
            for (let p of pd) {
                // let payerId = p.payer._id;
                let payerUserName = p.payer.userName;
                for (let receivers of p.receivers) {
                    // let receverId = receivers.receiver._id;
                    let receiverUserName = receivers.receiver.userName;
                    arr2[payerUserName][receiverUserName] += receivers.amount;
                }
            }
            let to = [], from = [];
            for (let {userName} of userDetails) {
                let netAmount = arr2[currUserName][userName] - arr2[userName][currUserName];
                curr += arr2[userName][currUserName];
                if (netAmount > 0) {
                    from.push({userName, netAmount});
                } else if (netAmount < 0) {
                    to.push({userName, netAmount: -netAmount});
                }
            }
            setCurrentUserExpenditures(curr);
            setPayTo(to);
            setTakeFrom(from);
        } catch (e: any) {
            console.error("Error in getPayTo: ", e.message);
        } finally {
            setTableLoading(false);
        }
    }

    useEffect(() => {
        // getUsers is the function which is used to get all the members from the tripId*/
        async function getUsers() {
            try {
                setUserLoading(true);
                setTableLoading(true);
                const res = await axios.post("/api/trip/getUsersFromTripId", {tripId: tripId});
                const userDetails = res.data.data.map((user: any) => {
                    if (user.isOwner) setOwner(user._doc);
                    return user._doc
                });
                setMembers(userDetails);
                await getPaymentsDetails(userDetails);
            } catch (e: any) {
                console.error("Error While Fetching users from tripId: ", e);
            } finally {
                setUserLoading(false);
                setTableLoading(false);
            }
        }

        getUsers().then();
    }, [load])

    return (
        <div className="flex flex-col items-center justify-around">
            {/*Headings*/}
            <div className="flex w-[100vw] flex-wrap items-center justify-around">
                <h3 className="mt-5">Created By: {owner.userName} </h3>
                <div className="flex flex-col">
                    <button disabled
                            className="relative inline-flex items-center justify-center mt-5 p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500   dark:text-white">
                          <span
                              className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md">
                              Your Total Expenditure: {currentUserExpenditures} Rs
                          </span>
                    </button>
                    <span style={{fontSize: '10px'}}>After Clearing All Payments From Freinds</span>
                    <span onClick={() => setHelper(true)}
                          className="text-sm, text-blue-600 cursor-pointer hover:underline">Understand with simple example</span>
                </div>
            </div>
            {/* The Button Clicked open the pay modal */}
            {!helper &&
                <div className="flex items-center gap-6">
                    <h1 className="mt-5 text-2xl">Make Payment: </h1>
                    <button onClick={() => setPay(prev => !prev)}
                            className="relative inline-flex items-center justify-center mt-5 p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                  <span
                      className="relative px-4 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Pay Now
                  </span>
                    </button>
                </div>
            }
            {/*Either pay modal remains open or dahboard */}
            {
                helper ? <Helper closeFunction={setHelper} msg={"totalExpenditureFeature"}/> :
                    <>
                        {pay ?
                            <div><Pay loadUpperPage={setLoad} tripId={tripId} members={members}
                                      handleClose={setPay}/>
                            </div> :
                            <div className="flex flex-row flex-wrap">
                                {/*/!*Members in The trip shown in by the following component*!/*/}
                                <FreindsList loading={userLoading} members={members}/>
                                {/*/!* Current user pending payments *!/*/}
                                <PayTo loading={tableLoading} payTo={payTo}/>
                                <TakeFrom loading={tableLoading} takeFrom={takeFrom}/>
                            </div>
                        }
                    </>
            }
        </div>
    );
}

export default MyTrip;