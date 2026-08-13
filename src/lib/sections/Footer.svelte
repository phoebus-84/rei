<script>
	import logo from '$lib/assets/logo.png';
	import * as m from '$lib/paraglide/messages';
	const year = new Date().getFullYear();
</script>
<footer id="footer">
	<hr class="mx-auto w-11/12 border-border" />

	<section class="container grid grid-cols-2 gap-x-12 gap-y-8 py-20 md:grid-cols-4 xl:grid-cols-6">
		<div class="col-span-full xl:col-span-2">
			<a href="/" class="flex text-xl font-bold">
				<img src={logo} alt="REI Logo" class="mr-2 h-8 w-auto" />
				REI Casa
			</a>
			<p class="mt-4 text-muted-foreground">
				La tua agenzia di fiducia a Ivrea e nel Canavese. Valorizziamo il tuo patrimonio con
				professionalità e trasparenza.
			</p>
		</div>

		<div class="flex flex-col gap-2">
			<h3 class="text-lg font-bold">Contatti</h3>
			<div>
				<a href="mailto:info@reicasa.it" class="opacity-60 hover:opacity-100">
					info@reicasa.it
				</a>
			</div>
			<div>
				<a href="tel:+390125282335" class="opacity-60 hover:opacity-100">
					+39 0125 282335
				</a>
			</div>
			<div>
				<span class="opacity-60"> Via Jervis, Ivrea (TO) </span>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<h3 class="text-lg font-bold">Menu</h3>
			<div>
				<a href="/#about" class="opacity-60 hover:opacity-100">
					Chi Siamo
				</a>
			</div>
			<div>
				<a href="/#features" class="opacity-60 hover:opacity-100">
					Servizi
				</a>
			</div>
			<div>
				<a href="/case-in-vendita" class="opacity-60 hover:opacity-100">
					Case in vendita
				</a>
			</div>
			<div>
				<a href="/case-in-affitto" class="opacity-60 hover:opacity-100">
					Case in affitto
				</a>
			</div>
			<div>
				<a href="/valutazione-casa" class="opacity-60 hover:opacity-100">
					Valutazione casa
				</a>
			</div>
			<div>
				<a href="/#vantaggi" class="opacity-60 hover:opacity-100">
					Vantaggi
				</a>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<h3 class="text-lg font-bold">Legale</h3>
			<div>
				<a href="/pp" class="opacity-60 hover:opacity-100">
					{m.footer_privacy()}
				</a>
			</div>
			<div>
				<button
					onclick={() => {
						localStorage.removeItem('cookie_consent');
						window.location.reload();
					}}
					class="text-left opacity-60 hover:opacity-100"
				>
					{m.footer_cookie_settings()}
				</button>
			</div>
		</div>
	</section>

	<section class="container pb-14 text-center">
		<h3>&copy; {year} REI Casa — {m.footer_copyright()}</h3>
	</section>
</footer>
