<script>
	import Header from '../components/header.svelte';
	import '../app.css';
</script>

<Header></Header>
<slot></slot>
<h1 class="w">hey</h1>

<style lang="postcss">
  /* CSS Variables */
  :root{
    --brand-color: #0400C7;
  }
  /* Global Styles */
  :global(*) {
		box-sizing: border-box;
    margin: 0;
	}
	:global(html) {
		background-color: #EDEDF6;
		max-width: 100%;
		min-height: 100%;
		position: relative;
	}
	:global(body) {
		line-height: 1.5;
  -webkit-font-smoothing: antialiased;
	}
  :global(h1){
    font-family: "Segoe UI", Candara, "Bitstream Vera Sans", "DejaVu Sans", "Bitstream Vera Sans", "Trebuchet MS", Verdana, "Verdana Ref", sans-serif;
    font-weight: 500;
  }
  :global(h2){
    font-family: "Segoe UI", Candara, "Bitstream Vera Sans", "DejaVu Sans", "Bitstream Vera Sans", "Trebuchet MS", Verdana, "Verdana Ref", sans-serif;
    font-weight: 400;
  }
  :global(p,label,button){
    font-family: Frutiger, "Frutiger Linotype", Univers, Calibri, "Gill Sans", "Gill Sans MT", "Myriad Pro", Myriad, "DejaVu Sans Condensed", "Liberation Sans", "Nimbus Sans L", Tahoma, Geneva, "Helvetica Neue", Helvetica, Arial, sans-serif;
    line-height: 140%;
    font-weight: 300;
  }
  /*  Font Sizing Queries  */
	@media (max-width: 420px) {
		:global(html) {
			font-size: 1rem;
		}
		:global(h1) {
			font-size: 1.5rem;
		}
		:global(h2) {
			font-size: 1.25rem;
		}
	}
	@media (min-width: 421px) {
		:global(html) {
			font-size: calc(1rem + 0.3vw);
		}
		:global(h1) {
			font-size: calc(1.8rem + 0.3vw);
		}
		:global(h2) {
			font-size: calc(1.2rem + 0.3vw);
		}
	}
	@media (min-width: 1921px) {
		:global(html) {
			font-size: calc(1rem + 0.6vw);
		}
		:global(h1) {
			font-size: calc(2.1rem + 0.6vw);
		}
		:global(h2) {
			font-size: calc(1.8rem + 0.6vw);
		}
	}
  
  /*  Layout Queries  */
	@media (max-width: 600px) {
		:global(body) {
			
		}
	}
	@media (min-width: 601px) and (max-width: 1024px) {
		:global(body) {
			
		}
	}
	@media (min-width: 1025px) {
		:global(body) {
			padding: 0 4rem;
		}
	}

</style>