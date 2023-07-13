// Join trip route by tripId
import {connect} from "@/dbConfig/db";
import {NextRequest, NextResponse} from "next/server";
import LinkTrip from "@/models/LinkTrips";
import getDataFromToken from "@/helpers/getDataFromToken/route";
import User from "@/models/UserModel";

export async function POST(req: NextRequest) {
    try {
        await connect();
        const {tripId, isOwner, uName} = await req.json();
        let uId: any;
        if (uName) {
            uId = await User.findOne({userName: uName}).select("_id");
        } else {
            uId = await getDataFromToken(req);
        }
        const userId = uId;
        if (!userId) {
            return NextResponse.json({
                msg: "You are not authorized to join this trip.",
                success: false,
            }, {status: 401});
        }
        const linkTrip = await LinkTrip.findOne({tripId, userId});
        if (linkTrip) {
            return NextResponse.json({
                msg: "You have already joined this trip.",
                success: true,
            }, {status: 200});
        }
        const newLinkTrip = new LinkTrip({
            tripId,
            userId,
            isOwner
        });
        await newLinkTrip.save();
        return NextResponse.json({
            msg: "You have successfully joined this trip."
        }, {status: 200});
    } catch (e: any) {
        return NextResponse.json({
            msg: "Error in join trip.",
            error: e.message
        }, {status: 500});
    }

}
