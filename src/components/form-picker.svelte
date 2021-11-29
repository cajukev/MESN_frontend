<script>
  import { each } from "svelte/internal";
  //export let booked;
  const dayStrings = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const dateNow = Date.now();
  let currentWeek = 0;
  let currentDay = 0;
  $: timeSlots = generateTimeSlots(currentWeek,currentDay);
  $: week = [new Date(addXDays(dateNow,0+currentWeek*7)),
              new Date(addXDays(dateNow,1+currentWeek*7)),
              new Date(addXDays(dateNow,2+currentWeek*7)),
              new Date(addXDays(dateNow,3+currentWeek*7)),
              new Date(addXDays(dateNow,4+currentWeek*7)),
              new Date(addXDays(dateNow,5+currentWeek*7)),
              new Date(addXDays(dateNow,6+currentWeek*7))];
  function addXDays(date, x){
    return date + (1000*60*60*24*x);
  }
  function prevWeek(){
    currentWeek = Math.max(currentWeek-1,0);
  }
  function nextWeek(){
    currentWeek = Math.min(currentWeek+1,4);
  }
  function generateTimeSlots(){
    let timeSlots = [];
    for(let i=9;i<21;i++){
      const date = new Date(addXDays(dateNow,currentDay+currentWeek*7));
      let first = {"month":date.getMonth(), "date":date.getDate(), "time": i + ":00 - "+i+":30"}
      let second = {"month":date.getMonth(), "date":date.getDate(),"time": i+":30 - "+(i+1)+":00"}
      timeSlots.push(first)
      timeSlots.push(second)
    }
    return timeSlots
  }
  /*function isBooked(timeSlot){
    let flag = false;
    booked.forEach(bookedSlot => {
      if(
        timeSlot.date == bookedSlot.date &&
        timeSlot.time == bookedSlot.time &&
        timeSlot.month == bookedSlot.month
      ){
        console.log("true")
        flag = true
      }
    });
    return flag;
  }*/
</script>

<div class="form-picker">
  <form>
    <label for="name">Name</label>
    <input type="text" name="name" id="name">
    <label for="email">Email</label>
    <input type="text" name="email" id="email">
    <label for="phone">Phone</label>
    <input type="text" name="phone" id="phone">
  </form>
  <div class="date-time-picker">
    <div class="date-picker">
      <button class="prev-button" on:click={prevWeek}>Prev</button>
      {#each week as day, i}
        <div class="date">
          <p class="date-day">{dayStrings[day.getDay()]}</p>
          <p class="date-num">{day.getDate()}</p>
        </div>
      {/each}
      <button class="next-button" on:click={nextWeek}>Next</button>
    </div>
    <div class="time-picker"><!--
      {#each timeSlots as timeSlot}
        <span class="timeSlot {isBooked(timeSlot) ? "inactive" : "active"}" >{timeSlot.time}</span>
      {/each}-->
    </div>
  </div>
</div>
