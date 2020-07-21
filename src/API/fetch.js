
async function my_fetch(url, init){
    let result;
    let defInit = {
        method: 'GET',
        headers: {
          'Content-Type':'application/json',
        },
         // body: {}   POST方法配置
        mode: 'cors',
     };
     init = Object.assign(defInit, init);
    await fetch(url, init).then(data => {
        return data.text(); 
    }).then( res => {
        result = JSON.parse(res);
    }).catch((error) => { 
        console.log(error.message);
    });
    return result;
}

export default my_fetch;