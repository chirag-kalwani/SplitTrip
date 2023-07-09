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
            await new TripPayment({
                tripId,
                payerId: d.userId,
                receiverId: userId,
                amount: d.share,
            }).save();
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
