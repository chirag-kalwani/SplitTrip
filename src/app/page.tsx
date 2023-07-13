'use client';
import React, {useEffect, useState} from 'react';
import Spinner from "@/components/Spinners/Spinner";
import MainPage from "@/components/MainPage/MainPage";
import axios from "axios";

function Home() {
    const [myData, setMyData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [loadThisPage, setLoadThisPage] = useState(false);


    // Fetching User's Data so That we can display it on the page
    async function getMyData() {
        try {
            const res = await axios.get('/api/users/me');
            return res.data.user;
        } catch (e: any) {
            console.log("error in getMyData: ", e);
            return null;
        }
    }

    useEffect(() => {
        setLoading(true);
        getMyData().then((res) => {
            if (res.firstName === undefined) res.firstName = "";
            if (res.lastName === undefined) res.lastName = "";
            if (!res.image) res.image = "";
            setMyData(res);
            setLoading(false);
        });
    }, [loadThisPage]);

    // If the data is not fetched yet, we show the spinner
    if (loading) return <Spinner/>
    return (
        <>
            {/*If Data fetched Successfully we show the MainPage Component*/}
            {/*loadingUpperPage prop use to load this page*/}
            <MainPage loadUpperPage={setLoadThisPage} email={myData.email} userName={myData.userName}
                      name={myData.firstName + " " + myData.lastName} isEmailVerified={myData.isVerified}
                      image={myData.image}/>
        </>
    )
}

export default Home;