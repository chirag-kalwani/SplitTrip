// loqin route
import {connect} from '@/dbConfig/db'
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    await connect();
    try {
        const reqBody = await req.json();
        const {email, password} = reqBody;

        const user = await User.findOne({email: email});
        if (!user) {
            return NextResponse.json({
                    error: "Wrong Credentials"
                },
                {status: 401,}
            );
        }
        let compare = await bcrypt.compare(password, user.password);
        if (!compare) {
            return NextResponse.json({
                    error: "Wrong Credentials"
                },
                {status: 401,}
            );
        }
        // create tokenData
        const tokenData = {
            id: user._id,
            email: user.email,
            name: user.userName,
        }
        // create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'});

        const response = NextResponse.json({
            msg: "Login Success",
            success: true,
        }, {status: 200,});
        response.cookies.set('token', token, {httpOnly: true});
        return response;
    } catch (e: any) {
        console.log("location: Login route 1: ", e);
        return NextResponse.json({
                error: e.message
            },
            {status: 500,}
        );
    }
}
