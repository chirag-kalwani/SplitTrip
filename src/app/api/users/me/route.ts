import {connect} from '@/dbConfig/db'
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";
import getDataFromToken from '@/helpers/getDataFromToekn/route';

export async function GET(req: NextRequest) {
    await connect();
    try {
        const userId = await getDataFromToken(req);
        if (typeof userId === 'string') {
            const user = await User.findOne({_id: userId}).select('-password');
            if (user) {
                return NextResponse.json({
                    msg: "user found",
                    user,
                }, {status: 200});
            } else {
                return NextResponse.json({
                    errorLocation: "Error in me Route: ",
                    err: "User Not Found in Database"
                }, {status: 404});
            }
        } else {
            return NextResponse.json({errorLocation: "Error in me Route: "}, {status: 500});
        }
    } catch (err: any) {
        return NextResponse.json({errorLocation: "Error in me Route: ", err}, {status: 500});
    }
}
