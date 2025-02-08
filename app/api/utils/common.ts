import { type NextRequest } from 'next/server'
import { CompletionClient } from 'dify-client'
import { v4 } from 'uuid'
import { API_URL } from '@/config'

const userPrefix = (difyId: string) => `user_${difyId}:`

export const getInfo = (request: NextRequest, difyId: string) => {
  const sessionId = request.cookies.get('session_id')?.value || v4()
  const user = userPrefix(difyId) + sessionId
  return {
    sessionId,
    user,
  }
}

export const setSession = (sessionId: string) => {
  return { 'Set-Cookie': `session_id=${sessionId}` }
}

export function handleDifyCredentials(difyId: string, difyCode: string) {
  console.log('Handling Dify Credentials:', difyId, difyCode)

  const client = new CompletionClient(difyCode, API_URL || undefined)
  // 其他需要使用 difyId 和 difyCode 的操作
}
