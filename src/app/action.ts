"use server"

import { UnknownBackendError } from "@/lib/errors"
import { ServerActionResponse } from "@/lib/types"

export async function action(): Promise<ServerActionResponse> {
    try {
        throw new UnknownBackendError({
            publicMessage: "This is a public message",
            privateMessage: "This is a private message",
            severity: "INFO",
            source: "action",
        })
    } catch (error: any) {
        return {
            error: error.getPublicMessage(),
            success: false,
        }
    }
}