<script>
    import { Router, Link, Route } from "svelte-routing";
    import { get, MOVIE_QUERY, MOVIE_LIST_QUERY } from "./api.js";

	var movielist = get(MOVIE_LIST_QUERY);

</script>

<div class="wrapper">

	<!-- promise is pending -->
    {#await movielist}
        loading

	<!-- promise was fulfilled -->
    {:then response}
        {#if response.data.movieList.length > 0}
            {#each response.data.movieList as movie}
                <div class="card">
                    <Link to={`/movie/${movie.slug}`}>
                        <img class="poster" alt={movie.name} src={movie.posterUrl} />
                        <p class="movie-title">{movie.name}</p>
                    </Link>
                </div>
            {/each}
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
        flex-direction: row;
        flex-wrap: wrap;
    }
    .card {
        box-sizing: border-box;
        position: relative;
        width:200px;
        height:auto;
        margin:16px;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 4px rgba(0,0,0,0.25);
    }
    .poster {
        width:100%;
        height:auto;
        cursor: pointer;
    }
    .movie-title {
        padding:4px 8px;
        font-weight: bold;
        text-decoration: none;
        cursor: pointer;
    }
</style>

