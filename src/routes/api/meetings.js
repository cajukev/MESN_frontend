export async function get(){
  /*const meetings = fetch('http://localhost:8080/api/meetings',{
  })
  .then(response => response.json())*/
  const meetings = {"status":"success","message":"Meetings retrieved successfully","data":[{"_id":"61a3ee1e1bfb3377c633c3f5","create_date":"2021-11-28T21:01:18.787Z","name":"Kevin","email":"kevin@email","phone":"00000000","__v":0}]}
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