export async function fetchData (data, url){
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(data)
  };

  let json_respon = await fetch(url, requestOptions)
  let res = await json_respon.json()
  return res
}