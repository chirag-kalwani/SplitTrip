// logout
import {NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function GET() {
    try {
        cookies()?.set('token', '', {httpOnly: true});
        return NextResponse.json({
            msg: "Logout Success",
            success: true,
        }, {status: 200,});
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
        }, {
            status: 500,
        });
    }
}