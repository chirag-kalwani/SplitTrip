// Join trip route by tripId
import {connect} from "@/dbConfig/db";
import {NextRequest, NextResponse} from "next/server";
import LinkTrip from "@/models/LinkTrips";
import getDataFromToken from "@/helpers/getDataFromToken/route";
import TripPayment from "@/models/TripPayment";

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
        const allUsers = await LinkTrip.find({tripId});
        for (let user of allUsers) {
            await new TripPayment({
                payerId: userId,
                receiverId: user.userId,
                amount: 0,
                tripId: tripId,
            }).save();
        }
        await new TripPayment({
            payerId: userId,
            receiverId: userId,
            amount: 0,
            tripId: tripId,
        }).save();
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
