<script>
	import { goto } from '$app/navigation';

	import { each } from 'svelte/internal';
	export let booked;
	const dayStrings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	const dateNow = Date.now();

	let currentWeek = 0;
	let currentDay = 0;
	let chosenTime = '';

	// Form binding variables
	let name;
	let email;
	let phone;
	let cb;

	$: timeSlots = generateTimeSlots(currentWeek, currentDay);
	$: week = [
		new Date(addXDays(dateNow, 0 + currentWeek * 7)),
		new Date(addXDays(dateNow, 1 + currentWeek * 7)),
		new Date(addXDays(dateNow, 2 + currentWeek * 7)),
		new Date(addXDays(dateNow, 3 + currentWeek * 7)),
		new Date(addXDays(dateNow, 4 + currentWeek * 7)),
		new Date(addXDays(dateNow, 5 + currentWeek * 7)),
		new Date(addXDays(dateNow, 6 + currentWeek * 7))
	];
	function addXDays(date, x) {
		return date + 1000 * 60 * 60 * 24 * x;
	}
	function prevWeek() {
		currentWeek = Math.max(currentWeek - 1, 0);
		currentDay = 0;
		chosenTime = '';
	}
	function nextWeek() {
		currentWeek = Math.min(currentWeek + 1, 4);
		currentDay = 0;
		chosenTime = '';
	}
	function generateTimeSlots() {
		let timeSlots = [];
		for (let i = 9; i < 21; i++) {
			const date = new Date(addXDays(dateNow, currentDay + currentWeek * 7));
			let first = { month: date.getMonth(), day: date.getDate(), time: i + ':00 - ' + i + ':30' };
			let second = {
				month: date.getMonth(),
				day: date.getDate(),
				time: i + ':30 - ' + (i + 1) + ':00'
			};
			timeSlots.push(first);
			timeSlots.push(second);
		}
		return timeSlots;
	}
	function isBooked(timeSlot) {
		let flag = false;
		booked.forEach((bookedSlot) => {
			if (
				timeSlot.day == bookedSlot.day &&
				timeSlot.time == bookedSlot.time &&
				timeSlot.month == bookedSlot.month
			) {
				flag = true;
			}
			// Time has passed
			const date = new Date();
			if(!date.getHours() <= timeSlot.time.split(":")[0] && timeSlot.day == date.getDate()){
				flag = true
			}
			
		});
		return flag;
	}
	function changeDay(newDay) {
		currentDay = newDay;
		chosenTime = '';
	}
	function choseTime(newTime) {
		chosenTime = newTime;
	}
	async function submitBooking() {
		if (name != '' && email != '' && phone != '' && cb == true && chosenTime != '') {
			const date = new Date(addXDays(dateNow, currentDay + currentWeek * 7));
			const res = await fetch('/api/meetings', {
				method: 'POST',
				body: JSON.stringify({
					name: name,
					email: email,
					phone: phone,
					day: date.getDate(),
					month: date.getMonth(),
					time: chosenTime
				})
			}).then(() => {
				alert('Meeting Created!');
				location.reload();
			});
		} else {
			alert('Please do better');
		}
	}
</script>

<div class="form-picker">
	<form>
		<label for="name">Name</label>
		<input type="text" bind:value={name} name="name" id="name" />
		<label for="email">Email</label>
		<input type="text" bind:value={email} name="email" id="email" />
		<label for="phone">Phone</label>
		<input type="text" bind:value={phone} name="phone" id="phone" />
		<div class="cb">
			<input type="checkbox" bind:checked={cb} id="cb" name="cb" />
			<label class="cb-label" for="cb"
				>By submitting these details I consent to be contacted by KBweb in the near future to
				briefly discuss our meeting.</label
			>
		</div>

		<input type="button" value="Submit" on:click={submitBooking} />
	</form>
	<div class="date-time-picker">
		<div class="date-picker">
			<button class="prev-button" on:click={prevWeek}>
				<svg viewBox="0 0 24 53" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M24 49.1124L24 26.5V3.88764C24 1.0161 20.354 -0.214615 18.6137 2.0695L0 26.5L18.6137 50.9305C20.354 53.2146 24 51.9839 24 49.1124Z"
						stroke="black"
						fill={currentWeek > 0 ? 'black' : ''}
					/>
				</svg>
			</button>
			{#each week as day, i}
				<div
					class="date"
					title={day.getDate() + '/' + (day.getMonth() + 1) + '/' + day.getFullYear()}
				>
					<p class="date-day">{dayStrings[day.getDay()]}</p>
					<p class="date-num">{day.getDate()}</p>
					<button class="date-btn" on:click={() => changeDay(i)}>
						<svg viewBox="0 0 19 11" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M3.91826 0H9.5H15.0817C17.9564 0 19.1852 3.65264 16.8949 5.39007L9.5 11L2.1051 5.39007C-0.18515 3.65264 1.04356 0 3.91826 0Z"
								stroke="black"
								fill={currentDay == i ? 'black' : ''}
							/>
						</svg>
					</button>
				</div>
			{/each}
			<button class="next-button" on:click={nextWeek}>
				<svg viewBox="0 0 24 53" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M0 49.1124L0 26.5L0 3.88764C0 1.0161 3.64601 -0.214615 5.38629 2.0695L24 26.5L5.38629 50.9305C3.64601 53.2146 0 51.9839 0 49.1124Z"
						stroke="black"
						fill={currentWeek < 4 ? 'black' : ''}
					/>
				</svg>
			</button>
		</div>
		<div class="time-picker">
			{#each timeSlots as timeSlot, i}
				<button
					on:click={choseTime(timeSlot.time)}
					class="{isBooked(timeSlot) ? 'inactive' : 'active'} {timeSlot.time == chosenTime
						? 'chosen'
						: ''}"
				>
					<div class="timeSlot ">
						<p class="timeSlot-time">{timeSlot.time}</p>
					</div>
				</button>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	//Random Colors

	.form-picker {
		margin-top: 3rem;
		display: grid;
		grid-template-columns: 1fr 3fr;
		& form {
			background-color: #efefef;
			border: 1px solid #bbbbbb;
			padding: 1rem;
			height: fit-content;
			margin-right: 2rem;
			& label:not(.cb-label) {
				display: block;
			}
			& input[type='text'] {
				width: 100%;
			}
		}
		& .date-time-picker {
			background-color: #efefef;
			border: 1px solid #bbbbbb;
			padding: 1rem;
			& .date-picker {
				display: grid;
				grid-template-columns: 2fr repeat(7, 1fr) 2fr;
				align-items: center;
				justify-items: center;
				& .prev-button,
				.next-button {
					border: none;
					width: 1.5rem;
					cursor: pointer;
				}
				& .date {
					text-align: center;
					& .date-day {
						font-weight: 400;
					}
					& .date-num {
						font-size: 1.8rem;
						font-weight: 700;
					}
					& .date-btn {
						width: 1.5rem;
						padding: 0;
						border: none;
						cursor: pointer;
					}
				}
			}
			& .time-picker {
				margin-top: 1rem;
				display: grid;
				grid-template-columns: repeat(6, 1fr);
				grid-template-rows: repeat(4, 1fr);
				gap: 1rem;
				& button {
					padding: 0;
					margin: 0;
					border: none;
					&.inactive {
						pointer-events: none;
						.timeSlot {
							background: white;
							opacity: 0.75;
						}
					}
					&.chosen {
						border: 2px dashed black;
						background: #9ba3ee;
					}
					& .timeSlot {
						border-radius: 0.5rem;
						display: grid;
						justify-content: center;
						align-items: center;
						box-shadow: 0px 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
						background: #a6aef2;
						cursor: pointer;
						padding: 0.25rem 0.1rem;

						& .timeSlot-time {
							font-size: 1rem;
							font-weight: 700;
							text-align: center;
						}
					}
				}
			}
		}
	}
</style>
