import { useState } from "react"

export async function doReqPost(url, param){
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(param),
    })
    .then((res) => {
      if(res.status === 200 || res.status === 403) {
        return res.json()
      }
    })
  return result
  }
