"use client"
import { API_URL } from '@/config'
import axios from "axios"
const urlParams = new URLSearchParams(window.location.search)
const idParam = urlParams.get("id")
// console.log('====================================');
// console.log(idParam, 'idParam');
// console.log('====================================');

let APP_ID = null
let API_KEY = null
if (idParam) {
  await axios
    .get(`${API_URL}/api/public/ai/agent_detail?id=${idParam}`)
    .then((response) => {
      // console.log('====================================');
      // console.log(response.data.data.bot_id, 'bot_id');
      // console.log(response.data.data.bot_key, 'bot_key');
      // console.log('====================================');
      APP_ID = response.data.data.bot_id
      API_KEY = response.data.data.bot_key
    })
    .catch((error) => {
      console.error("Error fetching data:", error)
    })
}

export { APP_ID, API_KEY }