'use client';
import {useEffect, useState} from 'react';
import EditProfileModal from "@/components/Modals/EditProfileModal";
import axios from "axios";
import LogoutButton from "@/components/Buttons/LogoutButton";
import {useRouter} from "next/navigation";
import JoinTripModal from "@/components/Modals/JoinTripModal";
import {Tooltip} from 'react-tooltip';
import Link from "next/link";

function MainPage({email, userName, name, loadUpperPage, isEmailVerified, image}: any) {
    // States for modals to show and hide them
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [showJoinTripModal, setShowJoinTripModal] = useState(false);

    // State to show and hide loader
    const [showLoader, setShowLoader] = useState(false);

    // state to store my trips
    const [myTrips, setMyTrips] = useState([]);

    // router to redirect to login page after logout
    const router = useRouter();

    // color and text for email verification status
    let color = isEmailVerified ? "greeen" : "red";
    let text = isEmailVerified ? "Verified" : "Not Verified";

    // The function to handle logout and after logout redirect to login page
    async function handleLogout() {
        try {
            setShowLoader(true);
            const res = await axios.get('/api/users/logout');
            if (res.status === 200) {
                router.push('/login');
            }
        } catch (e: any) {
            console.log("Error While Logging Out: ", e);
        } finally {
            setShowLoader(false);
        }
    }

    useEffect(() => {
        // The funtion fetch my trips(trips in which current user is member) from backend
        async function getMyTrips() {
            try {
                const res = await axios.get('/api/trip/getMyTrips');
                const filtered = res.data.data.filter((trip: any) => trip._doc !== undefined);
                const myTrips = filtered.map((trip: any) => trip._doc);
                setMyTrips(myTrips);
            } catch (e: any) {
                console.log("Error While Getting My Trips: ", e);
            }
        }

        getMyTrips().then();
    }, []);

    // The function to handle click on trip name redirect to trip page with trip id
    function handleLiClick(id: any) {
        router.push(`/my_trip/${id}`);
    }

    return (
        <div className="flex flex-wrap justify-evenly">

            {/* First Part: User details */}

            <div
                className="container bg-gray-800 max-w-lg rounded dark:bg-gray-800 shadow-lg transform duration-200 easy-in-out m-12">
                <div className="h-2/4 sm:h-64 overflow-hidden">
                    <img className="w-full rounded-t"
                         src="https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                         alt="Photo by aldi sigun on Unsplash"/>
                </div>
                <div className="flex justify-start px-5 -mt-12 mb-5">
                    <span>
                        <img alt="Photo by aldi sigun on Unsplash"
                             src={image || "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"}
                             className="mx-auto object-cover rounded-full h-24 w-24 bg-gray-800 p-1"/>
                    </span>
                </div>
                <div className="bg-gray-800">
                    <div className="px-7  bg-gray-800">
                        <h2 className="text-3xl font-bold text-green-800 dark:text-gray-300">{name}</h2>

                        <div className="flex items-center mt-7">
                            <span className="mx-2 w-24">username: </span>
                            <div
                                className="px-2 py-1 cursor-pointer bg-green-900 max-w-min rounded-lg text-gray-300 hover:bg-green-800 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-gray-200">
                                {userName}
                            </div>
                        </div>
                        <div className="flex items-center mt-2">
                            <span className="mx-2 w-24">Name: </span>
                            <div
                                className="px-2 py-1 cursor-pointer bg-green-900 rounded-lg text-gray-300 hover:bg-green-800 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-gray-200">
                                {name}
                            </div>
                        </div>
                        <div className="flex items-center mt-2">
                            <span className="mx-2 w-24 ">Email: </span>
                            <div data-tooltip-id="emailVerificationToolTip" data-tooltip-content={text}
                                 data-tooltip-variant="error"
                                 className={`px-2 py-1 cursor-pointer bg-green-900 max-w-min rounded-lg text-gray-300 hover:bg-green-800 hover:text-${color}-100 dark:bg-gray-700 dark:text-${color}-300 dark:hover:bg-gray-600 dark:hover:text-${color}-400`}>
                                {email}
                            </div>
                            <Tooltip clickable place={"right"} style={{cursor: "pointer"}}
                                     id="emailVerificationToolTip"/>
                        </div>

                        <div className="flex items-center mt-2">
                            <span className="mx-2 w-24">Edit Profile: </span>

                            <button type="button" onClick={() => setShowEditProfileModal(true)}
                                    className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
                                Edit_Profile
                            </button>

                            <EditProfileModal loadUpperPage={loadUpperPage} show={showEditProfileModal}
                                              setShow={setShowEditProfileModal}/>
                        </div>

                        <div className="flex items-center mt-2">
                            <span className="mx-2 w-24 ">Logout: </span>
                            <LogoutButton show={showLoader} handleLogout={handleLogout}/>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-8"></div>
                    </div>
                </div>
            </div>

            {/* Second part: Trip Related */}

            <div
                className="container bg-gray-800 max-w-lg rounded dark:bg-gray-800 shadow-lg transform duration-200 easy-in-out m-12">
                <div className="flex justify-center">
                    <Link type="button" href={`/create_trip/${userName}`} target="_blank"
                          className="text-white bg-blue-700 hover:bg-blue-800 m-5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Create New Trip
                        <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                             fill="none"
                             viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </Link>
                    <button type="button" onClick={() => setShowJoinTripModal(true)}
                            className="text-white bg-blue-700 hover:bg-blue-800 m-5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Join Trip
                        <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                             fill="none"
                             viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </button>
                    <JoinTripModal loadUpperPage={loadUpperPage} show={showJoinTripModal}
                                   setShow={setShowJoinTripModal}/>
                </div>
                <div className="flex justify-center">
                    <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                        {myTrips.map((trip: any, i: number) => (
                            <li className="pb-5 pt-5 cursor-pointer" onClick={() => handleLiClick(trip._id)}
                                key={i}>
                                <div className="flex items-center space-x-4">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-3xl text-center font-semibold text-blue-600/100 dark:text-blue-500/100 hover:!text-blue-700">
                                            {trip.tripName}
                                        </p>
                                    </div>
                                </div>
                            </li>))
                        }
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default MainPage;