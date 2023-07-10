import {connect} from "@/dbConfig/db";
import {NextRequest, NextResponse} from "next/server";
import TripPayment from "@/models/TripPayment";
import getDataFromToken from "@/helpers/getDataFromToken/route";

export async function POST(req: NextRequest) {
    try {
        await connect();
        const {data, tripId, amount} = await req.json();
        const payerId = await getDataFromToken(req);
        let insertData: any = {tripId, payerId};
        let receivers = [];
        for (const d of data) {
            const {share, receiverId} = d;
            receivers.push({
                receiverIds: receiverId,
                amount: share
            })
        }
        insertData = {
            ...insertData,
            receivers,
            amount
        };
        let ret = await new TripPayment(insertData).save();
        return NextResponse.json({
            msg: "Payment added successfully",
            data: ret,
        }, {status: 200});
    } catch (e: any) {
        console.log("Error In addPayment:", e);
        return NextResponse.json({
            msg: "Error in addPayment: ",
            err: e,
        }, {status: 500});
    }
}
