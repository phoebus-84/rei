<script lang="ts">
	import * as m from '$lib/paraglide/messages';
</script>

<svelte:head>
	<title>{m.privacy_policy_title()} | REI Casa</title>
</svelte:head>

<section class="container mx-auto max-w-3xl px-4 py-16">
	<h1 class="text-3xl font-bold text-foreground">{m.privacy_policy_title()}</h1>
	<p class="mt-2 text-sm text-muted-foreground italic">
		{m.privacy_policy_subtitle()}
	</p>
	<p class="mt-1 text-xs text-muted-foreground">
		{m.privacy_last_updated()}: 15/04/2026
	</p>

	<hr class="my-8 border-border" />

	<!-- 1. Titolare del Trattamento -->
	<article class="space-y-3">
		<h2 class="text-xl font-semibold text-foreground">1. {m.privacy_controller_title()}</h2>
		<p class="leading-relaxed text-muted-foreground">{m.privacy_controller_desc()}</p>
	</article>

	<hr class="my-8 border-border" />

	<!-- 2. Finalità e Base Giuridica -->
	<article class="space-y-3">
		<h2 class="text-xl font-semibold text-foreground">2. {m.privacy_purpose_title()}</h2>
		<p class="leading-relaxed text-muted-foreground">{m.privacy_purpose_desc()}</p>
	</article>

	<hr class="my-8 border-border" />

	<!-- 3. Categorie di Dati -->
	<article class="space-y-3">
		<h2 class="text-xl font-semibold text-foreground">3. {m.privacy_data_title()}</h2>
		<p class="leading-relaxed text-muted-foreground">{m.privacy_data_desc()}</p>
	</article>

	<hr class="my-8 border-border" />

	<!-- 4. Periodo di Conservazione -->
	<article class="space-y-3">
		<h2 class="text-xl font-semibold text-foreground">4. {m.privacy_retention_title()}</h2>
		<p class="leading-relaxed text-muted-foreground">{m.privacy_retention_desc()}</p>
	</article>

	<hr class="my-8 border-border" />

	<!-- 5. Destinatari -->
	<article class="space-y-3">
		<h2 class="text-xl font-semibold text-foreground">5. {m.privacy_recipients_title()}</h2>
		<p class="leading-relaxed text-muted-foreground">{m.privacy_recipients_desc()}</p>
	</article>

	<hr class="my-8 border-border" />

	<!-- 6. Diritti dell'Interessato -->
	<article class="space-y-3">
		<h2 class="text-xl font-semibold text-foreground">6. {m.privacy_rights_title()}</h2>
		<p class="leading-relaxed text-muted-foreground">{m.privacy_rights_desc()}</p>
		<ul class="ml-6 list-disc space-y-1 text-muted-foreground">
			<li>{m.privacy_right_access()}</li>
			<li>{m.privacy_right_rectification()}</li>
			<li>{m.privacy_right_erasure()}</li>
			<li>{m.privacy_right_restriction()}</li>
			<li>{m.privacy_right_portability()}</li>
			<li>{m.privacy_right_objection()}</li>
			<li>{m.privacy_right_withdraw()}</li>
		</ul>
		<p class="leading-relaxed text-muted-foreground">
			Per esercitare i propri diritti, contattare il Titolare all'indirizzo email:
			<a href="mailto:info@reicasa.it" class="text-primary hover:underline">
				info@reicasa.it
			</a>
		</p>
	</article>

	<hr class="my-8 border-border" />

	<!-- 7. Diritto di Reclamo -->
	<article class="space-y-3">
		<h2 class="text-xl font-semibold text-foreground">7. {m.privacy_garante_title()}</h2>
		<p class="leading-relaxed text-muted-foreground">{m.privacy_garante_desc()}</p>
	</article>

	<hr class="my-8 border-border" />

	<!-- 8. Natura del Conferimento -->
	<article class="space-y-3">
		<h2 class="text-xl font-semibold text-foreground">8. {m.privacy_provision_title()}</h2>
		<p class="leading-relaxed text-muted-foreground">{m.privacy_provision_desc()}</p>
	</article>

	<hr class="my-8 border-border" />

	<!-- 9. Processi Automatizzati -->
	<article class="space-y-3">
		<h2 class="text-xl font-semibold text-foreground">9. {m.privacy_automated_title()}</h2>
		<p class="leading-relaxed text-muted-foreground">{m.privacy_automated_desc()}</p>
	</article>
</section>
