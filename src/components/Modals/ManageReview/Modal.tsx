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
  const onSubmit = (values: Partial<MovieReview>) => {
    console.log(values)
    dispatch(reviewsActions.update(values))
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
