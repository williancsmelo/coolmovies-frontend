import { ChangeEvent, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import general from '../../styles/general'
import { Pagination, CircularProgress, Backdrop } from '@mui/material'
import listingStyles from '../../styles/listing'
import ReviewCard from '../../components/review/ReviewCard'
import { useAppDispatch, useAppSelector, listingActions } from '../../redux'

const PAGE_SIZE = 5

const Listing: NextPage = () => {
  const dispatch = useAppDispatch()
  const listingState = useAppSelector(state => state.listing)
  const [currentPage, setCurrentPage] = useState(1)
  const changePage = (event: ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage)
    const requestConfig = {
      offset: (newPage - 1) * PAGE_SIZE,
      limit: PAGE_SIZE
    }
    dispatch(listingActions.fetch(requestConfig))
  }
  useEffect(() => {
    dispatch(listingActions.fetch({ limit: PAGE_SIZE }))
    dispatch(listingActions.fetchTotalCount())
  }, [])
  const pagination = (
    <Pagination
      count={Math.ceil(listingState.totalReviews / PAGE_SIZE)}
      page={currentPage}
      onChange={changePage}
      color="secondary"
      css={listingStyles.pagination}
    />
  )
  return (
    <div css={general.root}>
      <div css={general.pageContainer}>
        <Backdrop open={listingState.loading}>
          <CircularProgress hidden={!listingState.loading} color="secondary" />
        </Backdrop>
        {pagination}
        {listingState.listReviews.map(review => (
          <ReviewCard review={review} key={review.id} />
        ))}
        {pagination}
      </div>
    </div>
  )
}

export default Listing
