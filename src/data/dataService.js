export default function (url, data) {
    return fetch(url,{
        method: 'POST',
        body:JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }})
        .then(response=> response.json())
        .then(res => {
            if(res.statusCode !== 200)
                throw new Error(res.msg);
            else {
                return res.body;
            }
        })
}
