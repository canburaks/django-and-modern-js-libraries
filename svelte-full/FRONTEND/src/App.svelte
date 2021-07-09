<!-- App.svelte -->
<script>
  import { Router, Link, Route } from "svelte-routing";
  import MovieList from "./MovieList.svelte";
  import MoviePage from "./MoviePage.svelte";
  import Page from "./Page.svelte";
  import Home from "./Home.svelte";

  export let url = "";
</script>

<Router url="{url}">
  <div class="main-container">
    <Route path="page/:name" component="{Page}" />
    <Route path="/"><Home /></Route>
  </div>
</Router>

<style global>
    .navbar {
        background-color:rgba(255, 255, 255, 1);
        border-bottom:1px solid rgba(0,0,0, 0.2);
        display: flex;
        padding: 16px 64px;
        font-weight: bold;
        color:white;
    }
    .main-container {
        padding-top:64px;
        display:flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0,0,0, 0.15);
        min-height:80vh;
    }

</style>