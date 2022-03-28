import { ChangeEvent, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import general from '../../styles/general'
import { css } from '@emotion/react'
import { Pagination, CircularProgress, Backdrop, Button } from '@mui/material'
import listingStyles from '../../styles/listing'
import ReviewCard from '../../components/review/ReviewCard'
import { useAppDispatch, useAppSelector, reviewsActions } from '../../redux'
import ManageReviewModal from '../../components/Modals/ManageReview/Modal'
import AddIcon from '@mui/icons-material/Add'
import config from '../../config/listing-page'
import { notificationActions } from '../../redux'
import Notification from '../../components/elements-renderer/Notification'

const { PAGE_SIZE } = config

const Listing: NextPage = () => {
  const dispatch = useAppDispatch()
  const { totalReviews, loading, listReviews, currentPage } = useAppSelector(
    state => state.reviews
  )
  const [actionModal, setActionModal] = useState<'edit' | 'create'>('create')
  const [showModal, setShowModal] = useState(false)
  const [reviewToEdit, setReviewToEdit] = useState<MovieReview>()
  const changePage = (event: ChangeEvent<unknown>, newPage: number) => {
    reviewsActions.changeListingPage(newPage)
    const requestConfig = {
      offset: (newPage - 1) * PAGE_SIZE,
      limit: PAGE_SIZE
    }
    dispatch(reviewsActions.fetch(requestConfig))
  }
  const openModal = (action: 'edit' | 'create', review?: MovieReview) => {
    setActionModal(action)
    setReviewToEdit(review)
    setShowModal(true)
  }
  useEffect(() => {
    dispatch(reviewsActions.fetch())
    dispatch(reviewsActions.fetchTotalCount())
    dispatch(
      notificationActions.showNotification({ message: 'error', type: 'error' })
    )
  }, [])
  const numberOfPages = Math.ceil(totalReviews / PAGE_SIZE)
  const pagination = (
    <Pagination
      count={numberOfPages}
      page={currentPage}
      onChange={changePage}
      color="secondary"
      css={[
        listingStyles.pagination,
        { visibility: numberOfPages === 1 ? 'hidden' : 'visible' }
      ]}
    />
  )
  return (
    <div css={general.root}>
      <div css={[general.pageContainer, { maxWidth: '1024px' }]}>
        <Backdrop open={loading}>
          <CircularProgress hidden={!loading} color="secondary" />
        </Backdrop>
        <div css={styles.header}>
          {pagination}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => openModal('create')}
          >
            <AddIcon />
            Add Review
          </Button>
        </div>
        {listReviews.map(review => (
          <ReviewCard
            review={review}
            key={review.id}
            onEdit={item => openModal('edit', item)}
          />
        ))}
        {pagination}
      </div>
      <Notification />
      <ManageReviewModal
        visible={showModal}
        closeModal={() => setShowModal(false)}
        action={actionModal}
        review={reviewToEdit}
        onUpdate={() => changePage('simulateEvent' as any, currentPage)}
      />
    </div>
  )
}

const styles = {
  header: css`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding-block: 0;
  `
}

export default Listing
