import { useState } from 'react'

import { fetchGraphql } from 'lib/graphql'
import { useStore } from 'lib/store'

import { Box } from './Box'
import { Button } from './Button'
import { Input } from './Input'

export const Signup = (): JSX.Element => {
  const [name, setName] = useState('')
  const [isLoading, setLoading] = useState(false)
  const setUser = useStore((state) => state.setUser)

  const handleSubmit = async () => {
    setLoading(true)
    const { data } = await fetchGraphql<{
      insert_users_one: {
        id: string
        name: string
      }
    }>({
      query: `
      mutation signup($name: String!) {
        insert_users_one(object: {
          name: $name
        }) {
          id
          name
        }
      }
      `,
      variables: {
        name,
      },
    })

    if (data?.insert_users_one.name && data.insert_users_one.id) {
      setUser(data.insert_users_one)
    }

    setLoading(false)
  }

  return (
    <Box>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Escreve o teu nome"
      />
      {name.length > 2 && (
        <Button
          disabled={isLoading}
          css={{ mt: '$40' }}
          onClick={() => {
            handleSubmit()
          }}
        >
          Continuar
        </Button>
      )}
    </Box>
  )
}
