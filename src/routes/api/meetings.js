export async function get(){
  const meetings = fetch('http://localhost:8080/api/meetings',{
    mode:"cors"
  })
  .then(response => response.json())
  return {
    body: await meetings
  };
}

export async function post(request){
  const items = JSON.parse(request.body);
  const name = items.name;
  const email = items.email;
  const phone = items.phone;
  const day = items.day;
  const month = items.month;
  const time = items.time;
  
  const res = await fetch('http://localhost:8080/api/meetings', {
    method: 'POST',
    mode: "cors",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({"name": name, "email": email, "phone": 
    phone, "day":day, "month":month, "time": time })
  })
  .catch((err) => {
    console.log(err)
    return err;
  })
  .then((ret) => {
    return ret;
  })

  return {
    body: await res
  }

}