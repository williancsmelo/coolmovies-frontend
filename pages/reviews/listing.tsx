import type { NextPage } from 'next'
import general from '../../styles/general'
import ReviewCard from '../../components/review/ReviewCard'

const Listing: NextPage = () => {
  return (
    <div css={general.root}>
      <div css={general.pageContainer}>
        <ReviewCard />
      </div>
    </div>
  )
}

export default Listing
