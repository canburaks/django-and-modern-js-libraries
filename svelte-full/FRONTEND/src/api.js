import { GraphQLProvider, reportCacheErrors } from "graphql-svelte";

const client = GraphQLProvider({
    url: 'http://127.0.0.1:8000/graphql',
    headers: () => ({
        "content-type": "application/json",
        Accept: 'application/json'
    })
})


client.graphql.on('cache', reportCacheErrors)




  
// our first query will requests all movies
// with only given fields
// note the usage of string literals (`)
export const MOVIE_LIST_QUERY = `
    query movieList{
        movieList{
            name, posterUrl, slug
        }
    }
`

// Note the usage of argument.
// the exclamation mark makes the slug argument as required
// without it , argument will be optional
export const MOVIE_QUERY = `
    query movie($slug:String!){
        movie(slug:$slug){
            id, name, year, summary, posterUrl, slug
        }
    }
`
export const PAGE_QUERY = `
    query page($name:String!){
        page(name:$name){
            name, html
        }
    }
`

export const PAGE_MUTATION = `
  mutation pageMutation($name: String, $html:String) {
    pageMutation(name:$name, html:$html) {
      page {name, html}
      message
    }
  }
`;

// This is generic query function
// We will use this with one of the above queries and
// variables if needed
export async function get(query, variables = null) {
    const response =  await client.get({ query , variables })
    console.log("response", response);
    return response
}

export async function mutate(mutation, variables = null) {
    return await client.mutate( { query:mutation, variables })
  }
