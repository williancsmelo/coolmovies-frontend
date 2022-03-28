import React from 'react'
import Modal from '../CustomModal'
import ManageReviewForm from './Form'
import { useAppDispatch, reviewsActions } from '../../../redux'

type ManageReviewModalProps = {
  visible: boolean
  closeModal: () => void
  action: 'edit' | 'create'
  review?: MovieReview
  onUpdate: () => void
}

const ManageReviewModal = ({
  visible,
  closeModal,
  action,
  review,
  onUpdate
}: ManageReviewModalProps) => {
  const dispatch = useAppDispatch()
  const onSubmit = async (values: Partial<MovieReview>) => {
    if (action === 'edit') {
      dispatch(reviewsActions.update(values))
    } else {
      dispatch(reviewsActions.create(values))
    }
    closeModal()
    onUpdate()
  }
  return (
    <Modal
      visible={visible}
      closeModal={closeModal}
      title={`${action} review`}
      size={900}
    >
      <ManageReviewForm
        action={action}
        initialValues={review}
        onSubmit={onSubmit}
      />
    </Modal>
  )
}

export default ManageReviewModal
