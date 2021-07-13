import React from 'react'

import { Container } from 'components/Box'
import { Signup } from 'components/Signup'
import { useStore } from 'lib/store'
import { App } from 'components/App'

const IndexPage: React.FC = () => {
  const user = useStore((state) => state.user)

  return <Container>{!user ? <Signup /> : <App />}</Container>
}

export default IndexPage
