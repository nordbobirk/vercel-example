import "server-only"
import { headers } from "next/headers"

export function getServerUrlBase() {
	if (process.env.NODE_ENV === "development") {
		return `http://localhost:3000`
	}
	
	return `https://${headers().get("host") || "example.com"}`
}