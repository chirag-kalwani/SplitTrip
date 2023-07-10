import {connect} from "@/dbConfig/db";
import LinkTrips from "@/models/LinkTrips";
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/UserModel";

export async function POST(req: NextRequest) {
    try {
        await connect();
        const {tripId} = await req.json();
        const data = await LinkTrips.find({tripId: tripId});
        const userData = [];
        for (let i = 0; i < data.length; i++) {
            userData.push({...await User.findById(data[i].userId).select('userName _id'), isOwner: data[i].isOwner});
        }
        return NextResponse.json({
            msg: "All users from trip id",
            data: userData,
        }, {status: 200});
    } catch (e: any) {
        return NextResponse.json({
            msg: "Error while getting all users from trip id",
            error: e.message
        }, {status: 500});
    }
}

