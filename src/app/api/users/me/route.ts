// Fetches the user data from the token: token is fetch by getDataFromToken function from helper folder
import {connect} from '@/dbConfig/db'
import User from "@/models/UserModel";
import {NextRequest, NextResponse} from "next/server";
import getDataFromToken from '@/helpers/getDataFromToken/route';

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
