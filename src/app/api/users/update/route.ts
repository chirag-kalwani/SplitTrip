// update user route: update route
import {connect} from '@/dbConfig/db'
import User from "@/models/UserModel";
import {NextRequest, NextResponse} from "next/server";
import getDataFromToken from '@/helpers/getDataFromToken/route';

export async function POST(req: NextRequest) {
    await connect();
    try {
        const {firstName, lastName, image} = await req.json();
        const userId = await getDataFromToken(req);
        if (typeof userId === 'string') {
            const user = await User.findOne({_id: userId}).select('-password');
            if (user) {
                const res = await User.updateOne({_id: userId}, {firstName, lastName, image});
                if (res.acknowledged) {
                    return NextResponse.json({
                        msg: "user updated",
                        user,
                    }, {status: 200});
                } else {
                    return NextResponse.json({
                            location: "Update route",
                            error: "Error in updating user"
                        },
                        {status: 500,}
                    );
                }
            }
        } else {
            return NextResponse.json({
                    location: "Update route",
                    error: "Error in getting user id"
                },
                {status: 500,}
            );
        }
    } catch (e: any) {
        return NextResponse.json({
                location: "Update route",
                error: e.message
            },
            {status: 500,}
        );
    }
}