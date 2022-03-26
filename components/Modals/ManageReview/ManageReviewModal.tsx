import React from 'react'
import Modal from '../CustomModal'
import ManageReviewForm from './ManageReviewForm'

type ManageReviewModalProps = {
  visible: boolean
  closeModal: () => void
}

const ManageReviewModal = ({ visible, closeModal }: ManageReviewModalProps) => {
  return (
    <Modal
      visible={visible}
      closeModal={closeModal}
      title="Edit / Create Review"
      size={900}
    >
      <ManageReviewForm />
    </Modal>
  )
}

export default ManageReviewModal
