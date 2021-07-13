const GRAPHQL_ENDPOINT = 'https://era-uma-vez.herokuapp.com/v1/graphql'

export async function fetchGraphql<T = any, V = Record<string, any>>({
  query,
  variables,
}: {
  query: string
  variables?: V
}): Promise<{
  data?: T | undefined
  errors?:
    | {
        extensions: {
          path: string
          code: string
        }
        message: string
      }[]
    | undefined
}> {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(variables ? { query, variables } : { query }),
  })
  const data: {
    data?: T
    errors?: { extensions: { path: string; code: string }; message: string }[]
  } = await res.json()

  if (!res.ok) throw new Error('Failed to fetch Graphql API')

  return data
}
