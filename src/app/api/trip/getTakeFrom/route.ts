import {connect} from "@/dbConfig/db";
import {NextRequest, NextResponse} from "next/server";
import TripPayment from "@/models/TripPayment";
import getDataFromToken from "@/helpers/getDataFromToken/route";
import User from "@/models/UserModel";

export async function POST(req: NextRequest) {
    try {
        await connect();
        const {tripId} = await req.json();
        const userId = await getDataFromToken(req);
        let tripPayment = await TripPayment.find({tripId, receiverId: userId});
        const data = [];
        for (let i = 0; i < tripPayment.length; i++) {
            const payer = await User.findById(tripPayment[i].payerId).select("-password");
            data.push({trip: tripPayment[i], payer});
        }
        return NextResponse.json({
            msg: "Trip payment fetched successfully.",
            data,
        }, {status: 200});
    } catch (e: any) {
        return NextResponse.json({
            msg: "Error while getting trip payment.",
            error: e.message
        }, {status: 500});
    }
}
