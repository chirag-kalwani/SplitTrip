import {connect} from "@/dbConfig/db";
import {NextRequest, NextResponse} from "next/server";
import TripPayment from "@/models/TripPayment";
import getDataFromToken from "@/helpers/getDataFromToken/route";
import User from "@/models/UserModel";

export async function POST(req: NextRequest) {
    try {
        await connect();
        const userId = await getDataFromToken(req);
        let userName = await User.findById(userId).select('userName');
        userName = userName.userName;
        const {tripId} = await req.json();
        let res = await TripPayment.find({tripId});
        let data: any[] = [];
        for (const item of res) {
            let ret: any = {};
            ret['payer'] = await User.findById(item.payerId).select('userName');
            ret["createdAt"] = item.createdAt;
            ret['receivers'] = [];
            ret['amount'] = item.amount;
            for (const receiver of item.receivers) {
                let temp: any = {};
                temp['receiver'] = await User.findById(receiver.receiverIds).select('userName');
                temp['amount'] = receiver.amount;
                ret['receivers'].push(temp);
            }
            data.push(ret);
        }
        return NextResponse.json({
            msg: "Payment added successfully",
            data,
            userId,
            userName
        }, {status: 200});
    } catch (e: any) {
        return NextResponse.json({
            msg: "Error in addPayment: ",
            err: e,
        }, {status: 500});
    }
}
