
export const doReqPost = async function(url, param){
  let data = null
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(param),
    })
    // .then((res) => {
    //   if(res.status === 200) {
    //     res.json()
    //     .then((d)=>{
    //       console.log("data---> ", d)
    //       data = d
    //       console.log("1111---> ", data)
    //       return data
    //     })
    //   }
    // })

  }
