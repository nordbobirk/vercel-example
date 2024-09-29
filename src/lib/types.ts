export type ServerActionResponse = {
    error: string | undefined
    success: boolean
}

export type LogSourceMeta = {
	source: string
	sourceVersion: string
	environment: string
}

export type LogMeta = {
	timestamp: BigInt
	requestId?: string
	context?: any // normally a type imported from prisma, unimportant for this example
	associationId?: string
}

export type LogActorMeta = {
	actorMembershipId?: string
	actorMembershipName?: string
	actorMembershipRoleName?: string
	actorUserId?: string
}