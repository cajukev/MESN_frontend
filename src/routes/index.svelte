<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('/api/meetings')
			.then((response) => response.json())
			.then((json) => {
				return json;
			});
		const data = await res;
    let bookings = [];
    data.data.forEach(booking => {
      bookings.push(booking);
    });
		return {
			props: { booked:  bookings }
		};
	};
</script>

<script>
	import Header from '../components/header.svelte';
  import FromPicker from '../components/form-picker.svelte';
  import FormPicker from '../components/form-picker.svelte';
  export let booked;
</script>

<Header></Header>
<div class="page" id="index">
  <section class="greeting-grid">
    <h1><b>Stick out of the crowd</b> with a website that <span class="orange"><b>represents you.</b></span></h1>
    <div class="filler-text">
      <h2>Mauris posuere velit nec aliquam mollis.</h2>
      <p>Mauris posuere velit nec aliquam mollis. Donec ac risus cursus nisl laoreet fermentum. Duis laoreet vitae libero at facilisis. Aliquam erat volutpat. </p>
    </div>
    <div class="filler-text">
      <h2>Mauris posuere velit nec aliquam mollis.</h2>
      <p>Mauris posuere velit nec aliquam mollis. Donec ac risus cursus nisl laoreet fermentum. Duis laoreet vitae libero at facilisis. Aliquam erat volutpat. </p>
    </div>
    <div class="squares">

    </div>
  </section>
  <FormPicker booked={booked}></FormPicker>

</div>


