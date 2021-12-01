<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('/api/meetings')
			.then((response) => response.json())
			.then((json) => {
				return json;
			});
		const data = await res;
		let bookings = [];
		data.data.forEach((booking) => {
			bookings.push(booking);
		});
		return {
			props: { booked: bookings }
		};
	};
</script>

<script>
	import FormPicker from '../components/form-picker.svelte';
	export let booked;
</script>

<div class="page" id="index">
	<section class="greeting-grid">
		<div class="greeting-grid-text">
			<h1>
				<b>Stick out of the crowd</b> with a website that represents
				<span class="orange"><b>you.</b></span>
			</h1>
			<div class="filler-text">
				<h2>Mauris posuere velit nec aliquam mollis.</h2>
				<p>
					Mauris posuere velit nec aliquam mollis. Donec ac risus cursus nisl laoreet fermentum.
					Duis laoreet vitae libero at facilisis. Aliquam erat volutpat.
				</p>
			</div>
			<div class="filler-text">
				<h2>Mauris posuere velit nec aliquam mollis.</h2>
				<p>
					Mauris posuere velit nec aliquam mollis. Donec ac risus cursus nisl laoreet fermentum.
					Duis laoreet vitae libero at facilisis. Aliquam erat volutpat.
				</p>
			</div>
		</div>

		<div class="squares">
			<div class="square v1" />
			<div class="square v2" />
			<div class="square v1" />
			<div class="square v3" />
			<div class="square special" />
			<div class="square v1" />
			<div class="square v1" />
			<div class="square v2" />
			<div class="square v3" />
			<div class="square v3" />
			<div class="square v2" />
			<div class="square v1" />
		</div>
	</section>
	<FormPicker {booked} />
</div>

<style lang="scss">
	.page {
		background-color: #f9f9f9;
		box-shadow: 0px 0px 1rem rgba(0, 0, 0, 0.05);
		padding: 4rem;
		& .greeting-grid {
			display: grid;
			grid-template-columns: 2fr 1fr;
			& .greeting-grid-text {
				& h1 {
					color: var(--brand-color);
					text-shadow: 0px 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
					& .orange {
						color: #f27c0f;
					}
				}
        & .filler-text{
          margin-top: 3rem;
        }
			}
			& .squares {
        padding-left: 5rem;
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				grid-template-rows: repeat(4, 1fr);
        align-items: center;
        justify-items: center;
        gap:2rem;
				& .square {
					width: 3.5rem;
					height: 3.5rem;
					border-radius: 1rem;
					box-shadow: 0rem 0.5rem 1rem rgba(0, 0, 0, 0.15);
					&.v1 {
						background: #7b8dea;
            animation: square-idle 8s ease infinite;
					}
					&.v2 {
						background: #a6aef2;
            animation: square-idle 8s 1s ease infinite;
					}
					&.v3 {
						background: #8d9cee;
            animation: square-idle 8s 2s ease infinite;
					}
					&.special {
						background: linear-gradient(135deg, #ff9c41 0%, #f27c0f 100%),
							linear-gradient(
								135deg,
								#ff7c05 0%,
								rgba(255, 184, 119, 0.770833) 99.99%,
								rgba(255, 122, 0, 0) 100%
							);
						box-shadow: 0rem 0rem 1rem rgba(233, 111, 0, 0.6);
            animation: square-spin 8s linear infinite;
					}
				}
			}
		}
	}
  @keyframes square-spin{
    to{
      transform: rotate(360deg);
    }
  }
  @keyframes square-idle{
    33%{
      transform: rotate(-10deg);
    }
    66%{
      transform: rotate(10deg);
    }
  }
</style>
