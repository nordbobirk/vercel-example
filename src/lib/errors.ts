import "server-only";
import { LogActorMeta, LogMeta, LogSourceMeta } from "./types";
import { getServerUrlBase } from "./getServerBaseUrl";

/**
 * Input for the error constructors
 */
export type BackendErrorInput = {
  publicMessage: string;
  privateMessage: string;
  severity: any; // normally imported from prisma client
  stacktrace?: string;
} & LogActorMeta &
  Omit<LogMeta, "timestamp"> &
  Omit<LogSourceMeta, "sourceVersion" | "environment">;

/**
 * Input for the abstract error constructor
 */
export type AbstractBackendErrorInput = Omit<
  BackendErrorData,
  "environment" | "timestamp" | "sourceVersion"
>;

/**
 * Data held by an error
 */
export type BackendErrorData = BackendErrorInput & {
  category: any; // normally imported from prisma client
} & Omit<LogSourceMeta, "source">;

/**
 * Abstract class for all backend errors
 */
export abstract class BackendError extends Error {
  data: BackendErrorData;

  constructor(data: AbstractBackendErrorInput) {
    super(`${data.category}BackendError`);
    this.data = { ...data, environment: "example", sourceVersion: "example" };
    this.reportError();
  }

  /**
   * Reports the error to the error log
   */
  private async reportError() {
    const url = new URL("/api/v1/error/log", getServerUrlBase());
    
	console.log("sending error logging POST request to ", url, " with body ", this.data)
	console.log("using protection bypass header ", process.env.VERCEL_AUTOMATION_BYPASS_SECRET)

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(this.data),
      headers: {
        "Content-Type": "application/json",
        "X-LoggingApiKey": `Bearer ${process.env.LOGGING_API_KEY}`,
        "x-vercel-protection-bypass":
          process.env.VERCEL_AUTOMATION_BYPASS_SECRET ?? "", // bypass deployment protection
      },
    });
  }

  /**
   * @returns the front facing error message
   */
  getPublicMessage(): string {
    return this.data.publicMessage;
  }

  /**
   * @returns the internal error message
   */
  getPrivateMessage(): string {
    return this.data.privateMessage;
  }
}

/**
 * Error class for unknown errors
 */
export class UnknownBackendError extends BackendError {
  constructor(input: BackendErrorInput) {
    const data: AbstractBackendErrorInput = {
      ...input,
      category: "UNKNOWN",
    };
    super(data);
  }
}

// other error types are unimportant for this example
