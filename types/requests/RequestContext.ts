import { NextRequest } from "next/server"

export interface RequestContext {
  req: NextRequest
  user?: any
}
