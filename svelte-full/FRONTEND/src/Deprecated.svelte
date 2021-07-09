<script>
    import { Router, Link, Route } from "svelte-routing";
    import { get,mutate, PAGE_QUERY, PAGE_MUTATION } from "./api.js";
    import { onMount } from "svelte";
    // acquired from dynamic route part => /movie/:slug

    let assets = `<link rel="stylesheet" href="https://static.tildacdn.com/css/tilda-grid-3.0.min.css" type="text/css" media="all" />
    <link rel="stylesheet" href="https://tilda.ws/project1704483/tilda-blocks-2.12.css?t=1594884998" type="text/css" media="all" />
    <link rel="stylesheet" href="https://static.tildacdn.com/css/tilda-animation-1.0.min.css" type="text/css" media="all" />
    <link rel="stylesheet" href="https://static.tildacdn.com/css/tilda-slds-1.4.min.css" type="text/css" media="all" />
    <link rel="stylesheet" href="https://static.tildacdn.com/css/tilda-zoom-2.0.min.css" type="text/css" media="all" />
    <link rel="stylesheet" href="https://static.tildacdn.com/css/tilda-menusub-1.0.min.css" type="text/css" media="all" />
    <script src="https://static.tildacdn.com/js/jquery-1.10.2.min.js"><\/script>
    <script src="https://static.tildacdn.com/js/tilda-scripts-2.8.min.js"><\/script>
    <script src="https://tilda.ws/project1704483/tilda-blocks-2.7.js?t=1594884998"><\/script>
    <script src="https://static.tildacdn.com/js/lazyload-1.3.min.js" charset="utf-8"><\/script>
    <script src="https://static.tildacdn.com/js/tilda-animation-1.0.min.js" charset="utf-8"><\/script>
    <script src="https://static.tildacdn.com/js/tilda-slds-1.4.min.js" charset="utf-8"><\/script>
    <script src="https://static.tildacdn.com/js/hammer.min.js" charset="utf-8"><\/script>
    <script src="https://static.tildacdn.com/js/tilda-zoom-2.0.min.js" charset="utf-8"><\/script>
    <script src="https://static.tildacdn.com/js/tilda-menusub-1.0.min.js" charset="utf-8"><\/script>
	<script src="https://cdn.ckeditor.com/4.8.0/full-all/ckeditor.js"><\/script>
    `


    export let name;

    const pagedata = get(PAGE_QUERY, {name})
    let html;
    $:{
        if (html){

            const editor = document.getElementById("CK1")
            console.log("html: ", html.length, editor )
            editor.innerHTML = assets + html
            
        }
        if (pagedata && pagedata.data){
            console.log("append html: ", pagedata.data.page)
            html = pagedata.data.page.html
        }
    }

    async function handleSave(html){
        const mutationResponse = await mutate(PAGE_MUTATION, {name, html})
        console.log("mutation response: ", mutationResponse)
    }
    function getEditorData(){
        console.log("IS CKEDITOR?:", window.CKEDITOR)
        if (window.CKEDITOR){
            return CKEDITOR.instances.editor1.getData();

        }
    }
    onMount(() => {

    })
    
</script>

<div class="wrapper">

	<!-- promise is pending -->
    {#await pagedata}
        <p>Page {name} is loading</p>

	<!-- promise was fulfilled -->
    {:then pagedata}
        {#if pagedata.data}


            <div contenteditable="true" bind:innerHTML={html}>
                {@html pagedata.data.page.html}
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

</style>

