import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    console.log("request received in error log endpoint", request.method, request.url);
    // actual implementation is not relevant for this example since the problem is
    // that the request is never received by the endpoint that it is sent to
    return new Response("ok");
}