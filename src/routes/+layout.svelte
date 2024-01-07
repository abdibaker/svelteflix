<script lang="ts">
	import '../app.pcss';
	import logo from '$lib/img/logo.svg';
	import tmdb from '$lib/img/tmdb.svg';
</script>

<nav class="flex justify-between h-12 items-center px-4">
	<a href="/">
		<img class="h-6 lg:h-8" src={logo} alt="svelteflex logo" />
	</a>
	<ul class="flex gap-x-6 text-lg text-red-500">
		<li><a class="hover:text-red-600" href="/search">Search</a></li>
		<li><a class="hover:text-red-600" href="/watch-list">Watch list</a></li>
		<li><a class="hover:text-red-600" href="/login">Login</a></li>
	</ul>
</nav>

<main class="min-h-[calc(100vh-6rem)] px-4 xl:max-w-screen-xl container mx-auto">
	<slot />
</main>

<footer class="flex items-center gap-2 justify-center h-12">
	<p class="text-lg">Data provided by</p>
	<a href="https://www.themoviedb.org/" rel="external">
		<img class="h-4" src={tmdb} alt="The Movie Db" />
	</a>
</footer>
