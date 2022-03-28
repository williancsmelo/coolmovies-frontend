import React from 'react'
import Modal from '../CustomModal'
import ManageReviewForm from './ManageReviewForm'

type ManageReviewModalProps = {
  visible: boolean
  closeModal: () => void
  action: 'edit' | 'create'
  review?: MovieReview
}

const ManageReviewModal = ({
  visible,
  closeModal,
  action,
  review
}: ManageReviewModalProps) => {
  return (
    <Modal
      visible={visible}
      closeModal={closeModal}
      title={`${action} review`}
      size={900}
    >
      <ManageReviewForm action={action} initialValues={review} />
    </Modal>
  )
}

export default ManageReviewModal
