import { useStore } from 'lib/store'

import { Results } from './Results'
import { Story } from './Story'
import { Submission } from './Submission'

export const App = (): JSX.Element => {
  const submitted = useStore((state) => state.submitted)
  const voted = useStore((state) => state.voted)

  if (voted) {
    return <Results />
  }

  if (submitted) {
    return <Story />
  }

  return <Submission />
}
