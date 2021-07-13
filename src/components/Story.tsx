import { useQuery } from 'react-query'
import { useState } from 'react'

import { fetchGraphql } from 'lib/graphql'
import { useStore } from 'lib/store'

import { Box } from './Box'
import { Text } from './Text'
import { Button } from './Button'

export const Story = (): JSX.Element => {
  const user = useStore((state) => state.user)
  const vote = useStore((state) => state.vote)
  const [isLoading, setLoading] = useState(false)
  const [selectedPart, selectPart] = useState<number | null>(null)
  const { data } = useQuery(
    'story',
    async () => {
      const res = await fetchGraphql<{
        parts: { id: number; content: string }[]
      }>({
        query: `
        query getStory {
          parts(order_by: { id: asc }) {
            id
            content
          }
        }
      `,
      })

      return res.data
    },
    {
      refetchInterval: 3000,
    }
  )

  const handleSubmit = async () => {
    if (!selectedPart) return

    setLoading(true)
    const res = await fetchGraphql<
      { insert_votes_one: { part_id: number } },
      { id: string; part_id: number }
    >({
      query: `
        mutation vote($id: uuid!, $part_id: Int!) {
          insert_votes_one(object: {
            created_by: $id
            part_id: $part_id
          }) {
            part_id
          }
        }
      `,
      variables: {
        id: user?.id as string,
        part_id: selectedPart,
      },
    })

    if (res.data) {
      vote()
    }

    setLoading(false)
  }

  return (
    <Box>
      <Text variant="small">A história ({data?.parts.length} partes)</Text>
      <Text variant="small">
        Não leias em voz alta até toda a gente acabar!
      </Text>
      <Text variant="small" css={{ mb: '$40' }}>
        No final, vota na parte que gostares mais
      </Text>
      {data?.parts.map((part) => (
        <Box key={part.id}>
          <Text
            key={part.id}
            role="button"
            onClick={() => {
              selectPart((curr) => (curr === part.id ? null : part.id))
            }}
            css={{
              color: selectedPart === part.id ? '$white' : '$darkGreen',
              '@hover': {
                '&:hover': {
                  textDecoration: 'underline',
                },
              },
            }}
          >
            {part.content}
          </Text>
          {selectedPart === part.id && (
            <Button
              disabled={isLoading}
              css={{ my: '$40' }}
              onClick={() => {
                handleSubmit()
              }}
            >
              Esta é a minha preferida
            </Button>
          )}
        </Box>
      ))}
    </Box>
  )
}
