// loqin route
import {connect} from '@/dbConfig/db'
import User from "@/models/UserModel";
import {NextRequest, NextResponse} from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {cookies} from 'next/headers';

export async function POST(req: NextRequest) {
    try {
        await connect();
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

        cookies().set({
            name: 'token',
            value: token,
            path: '/',
            expires: new Date(Date.now() + 86400 * 1000),
            httpOnly: true,
            secure: true,
            priority: 'high',
        });
        return NextResponse.json({
            msg: "Login Success",
            success: true,
        }, {status: 200,});
    } catch (e: any) {
        return NextResponse.json({
                msg: "Error While login",
                error: e.message
            },
            {status: 500,}
        );
    }
}
