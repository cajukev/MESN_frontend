export async function get(){
  const meetings = fetch('http://localhost:8080/api/meetings')
  .then(response => response.json())
  return {
    body: await meetings
  };
}