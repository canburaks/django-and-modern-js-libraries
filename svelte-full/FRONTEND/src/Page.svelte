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



    function getEditorData(){
        console.log("IS CKEDITOR?:", window.CKEDITOR)
        if (window.CKEDITOR){
            const editordata =  window.CKEDITOR.instances.CK1.getData();
            console.log("editordata?:", editordata)
            return editordata
        }
    }
    async function handleSave(){
        const editordata = getEditorData()
        if (editordata){

            const mutationResponse = await mutate(PAGE_MUTATION, {name, html:editordata})
            console.log("mutation response: ", mutationResponse)
        }
    }
    onMount(async () => {
        const pagedata = await get(PAGE_QUERY, {name})
        console.log("pagedata", pagedata)
        if (pagedata && pagedata.data){
            const editor = document.getElementById("CK1")
            if (pagedata.data.page.html.startsWith("<link")){
                console.log("with asset")
                editor.innerHTML =  pagedata.data.page.html        
            }
            else {
                editor.innerHTML =  assets + pagedata.data.page.html  
            }
            }
    })
    
</script>

<button class="save-button" on:click="{handleSave}">KAYDET</button>

<style>
    button.save-button {
        position:fixed;
        bottom:90px;
        right:8px;
        background-color: blueviolet;
        width:120px;
        height:40px;
        color:white;
        cursor: pointer;
        font-weight: bold;
    }
    button.save-button:hover {
        background-color: rgb(162, 80, 238);
        transform: scale(1.05)
    }
	.wrapper {
        width:100%;
        height: auto;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

</style>

