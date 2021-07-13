import { useRouter } from 'next/dist/client/router'
import { useState } from 'react'
import { useQuery } from 'react-query'

import { useStore } from 'lib/store'
import { fetchGraphql } from 'lib/graphql'

import { Box } from './Box'
import { Textarea } from './Input'
import { Text } from './Text'
import { Button } from './Button'

export const Submission = (): JSX.Element => {
  const {
    query: { mode },
  } = useRouter()
  const user = useStore((state) => state.user)
  const submit = useStore((state) => state.submit)
  const [isLoading, setLoading] = useState(false)

  const [content, setContent] = useState('')

  const { data: users } = useQuery(
    'users',
    async () => {
      const res = await fetchGraphql<
        {
          users: {
            id: string
            parts_aggregate: { aggregate: { count: number } }
          }[]
        },
        { id: string }
      >({
        query: `
        query getUsers($id: uuid!) {
          users(where: { id: { _neq: $id } }) {
            id
            parts_aggregate {
              aggregate {
                count
              }
            }
          }
        }
      `,
        variables: {
          id: user?.id as string,
        },
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
  const nextUser = !users
    ? null
    : users.users.find((user) => user.parts_aggregate.aggregate.count === 0)

  const { data: myPart } = useQuery(
    'my-part',
    async () => {
      const res = await fetchGraphql<
        {
          parts: {
            content: string
          }[]
        },
        { id: string }
      >({
        query: `
        query getMyPart($id: uuid!) {
          parts(where: {
            next_user: { _eq: $id }
          }) {
            content
          }
        }
      `,
        variables: {
          id: user?.id as string,
        },
      })

      if (!res.data) {
        throw new Error('No data')
      }

      return res.data
    },
    {
      enabled: mode !== 'admin' && !content,
      refetchInterval: 3000,
    }
  )

  const handleSubmit = async () => {
    setLoading(true)
    const res = await fetchGraphql({
      query: `
        mutation insertMyPart(
          $id: uuid!
          $content: String!
          $nextUser: uuid!
        ) {
          insert_parts_one(object: {
            content: $content
            created_by: $id
            next_user: $nextUser
          }) {
            id
          }
        }
      `,
      variables: {
        id: user?.id as string,
        content,
        nextUser: nextUser?.id || null,
      },
    })

    if (res.data) {
      submit()
    }

    setLoading(false)
  }

  if ((!myPart || !myPart.parts.length) && mode !== 'admin') {
    return (
      <Box>
        <Text variant="small" css={{ mb: '$40' }}>
          A tua parte
        </Text>
        <Text>Espera...</Text>
      </Box>
    )
  }

  const isLastUser = !!users && !nextUser

  return (
    <Box>
      <Text variant="small" css={{ mb: '$40' }}>
        A tua parte{isLastUser && ` (és o último!)`}
      </Text>
      {myPart && myPart.parts && myPart.parts[0] && myPart.parts[0].content && (
        <>
          <Text>...</Text>
          <Text>{myPart.parts[0].content.split(' ').slice(-5).join(' ')}</Text>
        </>
      )}
      <Textarea
        placeholder={mode === 'admin' ? 'Começa aqui' : 'Continua aqui'}
        value={content}
        onChange={(e: any) => setContent(e.target.value)}
      />
      {content.split(' ').length > 5 && (
        <Button
          disabled={isLoading}
          css={{ mt: '$40' }}
          onClick={() => {
            handleSubmit()
          }}
        >
          {isLastUser ? 'Acabar a história' : 'Submeter'}
        </Button>
      )}
    </Box>
  )
}
