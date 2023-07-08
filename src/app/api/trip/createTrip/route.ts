// Create Trip Route
import {connect} from '@/dbConfig/db';
import Trip from "@/models/TripModel";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connect();
        const reqBody = await req.json();
        const {tripName, tripDescription, tripLocation} = reqBody;
        const trip = new Trip({
            tripName: tripName,
            tripDescription: tripDescription,
            tripLocation: tripLocation,
        });
        const savedTrip = await trip.save();
        return NextResponse.json({
            msg: "Trip Created Successfully",
            success: true,
            savedTrip,
        }, {status: 201});
    } catch (e: any) {
        return NextResponse.json({
                msg: "Error While Creating a trip",
                error: e.message
            },
            {status: 500,}
        );
    }

}
