<!-- App.svelte -->
<script>
  import { Router, Link, Route } from "svelte-routing";
  import MovieList from "./MovieList.svelte";
  import MoviePage from "./MoviePage.svelte";

  export let url = "";
</script>

<Router url="{url}">
  <nav class="navbar">
    <Link to="/">Home</Link>
  </nav>
  <div class="main-container">
    <Route path="movie/:slug" component="{MoviePage}" />
    <Route path="/"><MovieList /></Route>
  </div>
</Router>

<style>
    .navbar {
        background-color:rgba(0,0,0,0.6);
        display: flex;
        padding: 16px 64px;
        font-weight: bold;
        color:white;
    }
    .main-container {
        margin-top:32px;
        display:flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0,0,0, 0.15);
    }

</style>