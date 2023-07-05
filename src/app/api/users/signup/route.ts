import {connect} from '@/dbConfig/db'
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    await connect();
    try {
        const reqBody = await req.json();
        const {userName, email, password} = reqBody;
        console.log(reqBody);

        // check if user is already exist
        const user = await User.findOne({email: email});
        if (user) {
            return NextResponse.json({
                    error: 'User Already exist'
                },
                {status: 400,}
            );
        }

        // save the user in mongoDB
        // 1) hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        // 2) create new user
        const newUser = new User({userName, email, password: hashPassword});
        // 3) save the user
        const savedUser = await newUser.save();
        console.log(savedUser);
        return NextResponse.json({
            msg: "User Created Successfully",
            success: true,
            savedUser,
        }, {status: 201});
    } catch (e: any) {
        console.log("location: Signup route 1: ", e);
        return NextResponse.json({
                error: e.message
            },
            {status: 500,}
        );
    }
}
