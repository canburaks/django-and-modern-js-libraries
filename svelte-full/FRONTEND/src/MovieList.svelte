<script>
    import { Router, Link, Route } from "svelte-routing";
    import { get, MOVIE_QUERY, MOVIE_LIST_QUERY, PAGE_QUERY } from "./api.js";

	var pagenames = ["hubhelp"];

</script>

<div class="wrapper">


    {#each pagenames as page}
        <div class="card">
            <Link to={`/page/${page}`}>
                <p class="movie-title">{page}</p>
            </Link>
        </div>
    {/each}


</div>
<style>
	.wrapper {
        width:100%;
        height: auto;
        display:flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

</style>

