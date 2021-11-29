export async function get(){
  //const meetings = fetch('http://localhost:8080/api/meetings')
  //.then(response => response.json())
  return {
    //body: await meetings
    body: {"status":"success","message":"Meetings retrieved successfully","data":[{"_id":"61a3ee1e1bfb3377c633c3f5","create_date":"2021-11-28T21:01:18.787Z","name":"Kevin","email":"kevin@email","phone":"00000000","__v":0}]}
  };
}