// Get Data From Token Helper Function
import {NextRequest} from "next/server";
import jwt from "jsonwebtoken";

export default async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('token')?.value || "";
        const data: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return data.id;
    } catch (e: any) {
        console.log("Error In Get Data Helper Function: ", e);
        return new Error("Error In Get Data Helper Function: ", e);
    }
}