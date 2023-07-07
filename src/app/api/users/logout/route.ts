// logout
import {NextResponse} from "next/server";

export async function GET() {
    try {
        let response = NextResponse.json({
            msg: "Logout Success",
            success: true,
        }, {status: 200,});
        response.cookies.set('token', '', {httpOnly: true});
        return response;
    } catch (error: any) {
        NextResponse.json({
            error: error.message,
        }, {
            status: 500,
        });
    }
}