// Get all trips of current user: getMyTrips route

import {connect} from '@/dbConfig/db';
import {NextRequest, NextResponse} from "next/server";
import Trip from "@/models/TripModel";
import LinkTrips from "@/models/LinkTrips";
import getDataFromToken from "@/helpers/getDataFromToken/route";

export async function GET(req: NextRequest) {
    try {
        await connect();
        const userId = await getDataFromToken(req);
        const trips = await LinkTrips.find({userId: userId});
        const data: any[] = [];
        for (let i = 0; i < trips.length; i++) {
            data.push({...await Trip.findById(trips[i].tripId), key: i});
        }
        return NextResponse.json({
            msg: 'Success',
            data: data
        }, {status: 200});
    } catch (e: any) {
        return NextResponse.json({
            msg: 'Error while getting trip',
            error: e.message
        }, {status: 500});
    }
}

