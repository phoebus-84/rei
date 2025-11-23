<script>
	import logo from '$lib/assets/logo.png';
</script>
<footer id="footer">
	<hr class="mx-auto w-11/12" />

	<section class="container grid grid-cols-2 gap-x-12 gap-y-8 py-20 md:grid-cols-4 xl:grid-cols-6">
		<div class="col-span-full xl:col-span-2">
			<a rel="noreferrer noopener" href="/" class="flex text-xl font-bold">
				<img src={logo} alt="REI Logo" class="mr-2 h-8 w-auto" />
				REI Immobiliare
			</a>
			<p class="mt-4 text-muted-foreground">
				La tua agenzia di fiducia a Ivrea e nel Canavese. Valorizziamo il tuo patrimonio con
				professionalità e trasparenza.
			</p>
		</div>

		<div class="flex flex-col gap-2">
			<h3 class="text-lg font-bold">Contatti</h3>
			<div>
				<a
					rel="noreferrer noopener"
					href="mailto:info@rei-immobiliare.it"
					class="opacity-60 hover:opacity-100"
				>
					info@rei-immobiliare.it
				</a>
			</div>
			<div>
				<a rel="noreferrer noopener" href="tel:+390125000000" class="opacity-60 hover:opacity-100">
					+39 0125 000000
				</a>
			</div>
			<div>
				<span class="opacity-60"> Via Jervis, Ivrea (TO) </span>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<h3 class="text-lg font-bold">Menu</h3>
			<div>
				<a rel="noreferrer noopener" href="#about" class="opacity-60 hover:opacity-100">
					Chi Siamo
				</a>
			</div>
			<div>
				<a rel="noreferrer noopener" href="#features" class="opacity-60 hover:opacity-100">
					Servizi
				</a>
			</div>
			<div>
				<a rel="noreferrer noopener" href="#immobili" class="opacity-60 hover:opacity-100">
					Immobili
				</a>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<h3 class="text-lg font-bold">Social</h3>
			<div>
				<a rel="noreferrer noopener" href="#" class="opacity-60 hover:opacity-100"> Facebook </a>
			</div>
			<div>
				<a rel="noreferrer noopener" href="#" class="opacity-60 hover:opacity-100"> Instagram </a>
			</div>
			<div>
				<a rel="noreferrer noopener" href="#" class="opacity-60 hover:opacity-100"> Linkedin </a>
			</div>
		</div>
	</section>

	<section class="container pb-14 text-center">
		<h3>&copy; 2024 REI Immobiliare - P.IVA 00000000000</h3>
	</section>
</footer>
