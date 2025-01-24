import { type NextRequest } from 'next/server'
import { CompletionClient } from 'dify-client'
import { v4 } from 'uuid'
import { API_KEY, APP_ID } from "@/utils/getId";
import { API_URL } from '@/config'
console.log('====================================');
// console.log(APP_ID, 'APP_ID333');
console.log('====================================');
const userPrefix = `user_${APP_ID}:`

export const getInfo = (request: NextRequest) => {
  const sessionId = request.cookies.get('session_id')?.value || v4()
  const user = userPrefix + sessionId
  return {
    sessionId,
    user,
  }
}

export const setSession = (sessionId: string) => {
  return { 'Set-Cookie': `session_id=${sessionId}` }
}

export const client = new CompletionClient(API_KEY, API_URL || undefined)
