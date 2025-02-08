import { NextRequest, NextResponse } from 'next/server'
import fetch from 'node-fetch'
import { handleDifyCredentials } from '@/app/api/utils/common'

interface ApiResponse {
  data: {
    dify_id: string;
    dify_code: string;
  };
}

// 全局变量存储
let appId: string | null = null;
let apiKey: string | null = null;

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json()
    const url = ''  //接口域名
    const apiUrl = `${url}/api/public/ai/agent_detail?id=${id}`
    console.log('Fetching external API:', apiUrl)

    const response = await fetch(apiUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch from external API: ${response.statusText}`)
    }

    const data: ApiResponse = await response.json()
    console.log('External API response:', data)

    const difyId = data.data.dify_id
    const difyCode = data.data.dify_code

    // 调用 common.ts 中的函数
    handleDifyCredentials(difyId, difyCode)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error fetching external API:', error)
    return NextResponse.json({ error: 'Failed to retrieve app credentials' }, { status: 500 })
  }
} 