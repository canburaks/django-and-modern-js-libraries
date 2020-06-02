<script>
    import { Router, Link, Route } from "svelte-routing";
    import { get, MOVIE_QUERY } from "./api.js";

    // acquired from dynamic route part => /movie/:slug
    export let slug;

    const moviedata = get(MOVIE_QUERY, {slug})
    
</script>

<div class="wrapper">

	<!-- promise is pending -->
    {#await moviedata}
        <p>Movie {slug} is loading</p>

	<!-- promise was fulfilled -->
    {:then moviedata}
        {#if moviedata.data}
            <div class="movie-container">
                <img 
                    src={moviedata.data.movie.posterUrl} 
                    alt={`${moviedata.data.movie.name} poster`} 
                    class="movie-poster"
                />
                <div class="text-box">
                    <h1 class="movie-title">{moviedata.data.movie.name}</h1>
                    <p class="movie-description">{moviedata.data.movie.summary}</p>
                </div>
            </div>
        {/if}

    <!-- promise was rejected -->
    {:catch error}
        <p>Something went wrong: {error.message}</p>
    {/await}
</div>
<style>
	.wrapper {
        width:100%;
        height: auto;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .movie-container {
        display: flex;
        flex-wrap: wrap;
        max-width:500px;
    }
    .movie-poster {
        width:250px;
        height:auto;
    }
    .text-box {
        display: flex;
        flex-direction: column;
    }
</style>

