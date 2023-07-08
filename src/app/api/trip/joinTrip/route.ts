// Join trip route by tripId
import {connect} from "@/dbConfig/db";
import {NextRequest, NextResponse} from "next/server";
import LinkTrip from "@/models/LinkTrips";
import getDataFromToken from "@/helpers/getDataFromToken/route";

export async function POST(req: NextRequest) {
    try {
        await connect();
        const {tripId, isOwner} = await req.json();
        const userId = await getDataFromToken(req);
        const linkTrip = await LinkTrip.findOne({tripId, userId});
        if (linkTrip) {
            return NextResponse.json({
                msg: "You have already joined this trip."
            }, {status: 400});
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
        NextResponse.json({
            msg: "Error in join trip.",
            error: e.message
        }, {status: 500});
    }

}
