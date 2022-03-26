import type { NextPage } from 'next'
import general from '../../styles/general'
import { Pagination } from '@mui/material'
import listingStyles from '../../styles/listing'
import ReviewCard from '../../components/review/ReviewCard'

const Listing: NextPage = () => {
  const pagination = (
    <Pagination count={10} color="secondary" css={listingStyles.pagination} />
  )
  return (
    <div css={general.root}>
      <div css={general.pageContainer}>
        {pagination}
        <ReviewCard />
        <ReviewCard />
        {pagination}
      </div>
    </div>
  )
}

export default Listing
