import {connect} from "@/dbConfig/db";
import {NextRequest, NextResponse} from "next/server";
import TripPayment from "@/models/TripPayment";
import getDataFromToken from "@/helpers/getDataFromToken/route";

export async function POST(req: NextRequest) {
    try {
        await connect();
        const {data, tripId} = await req.json();
        const userId = await getDataFromToken(req);
        for (const d of data) {
            const findOld = await TripPayment.findOne({payerId: d.userId, receiverId: userId, tripId: tripId});
            const revertOld = await TripPayment.findOne({payerId: userId, receiverId: d.userId, tripId: tripId});
            if (findOld) {
                await TripPayment.updateOne({payerId: d.userId, receiverId: userId, tripId: tripId}, {
                    $set: {
                        amount: d.share * 1 + findOld.amount * 1,
                    }
                });
            } else {
                await TripPayment.updateOne({payerId: userId, receiverId: d.userId, tripId: tripId}, {
                    $set: {
                        amount: revertOld.amount * 1 - d.share * 1,
                    }
                });
            }
        }
        return NextResponse.json({
            msg: "Payment added successfully",
        }, {status: 200});
    } catch (e: any) {
        console.log("Error In addPayment:", e);
        return NextResponse.json({
            msg: "Error in addPayment: ",
            err: e,
        }, {status: 500});
    }
}
