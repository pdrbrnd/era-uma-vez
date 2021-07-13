import { useQuery } from 'react-query'

import { fetchGraphql } from 'lib/graphql'

import { Box } from './Box'
import { Text } from './Text'

export const Results = (): JSX.Element => {
  const { data } = useQuery(
    'winner',
    async () => {
      const res = await fetchGraphql<{
        votes: { part_id: number }[]
        parts: {
          id: number
          content: string
          votes_aggregate: { aggregate: { count: number } }
          user: { name: string }
        }[]
      }>({
        query: `
        query getWinner {
          votes {
            part_id
          }

          parts(
            limit: 1
            order_by:{
              votes_aggregate: { count: desc }
            }
          ) {
            id
            content
            votes_aggregate {
              aggregate {
                count
              }
            }
            user {
              name
            }
          }
        }
      `,
      })

      if (!res.data) {
        throw new Error('No data')
      }

      return res.data
    },
    {
      refetchInterval: 3000,
    }
  )

  const votes =
    (data &&
      data.parts &&
      data.parts.length &&
      data.parts[0].votes_aggregate.aggregate.count) ||
    0

  return (
    <Box>
      <Text variant="small" css={{ mb: '$40' }}>
        O grande vencedor com {votes} votos de {data?.votes.length}
      </Text>
      <Text>
        {data?.parts.map((part) => (
          <Box key={part.id}>
            <Text>{part.content}</Text>
            <Text variant="small" css={{ mt: '$24' }}>
              – {part.user.name}
            </Text>
          </Box>
        ))}
      </Text>
    </Box>
  )
}
