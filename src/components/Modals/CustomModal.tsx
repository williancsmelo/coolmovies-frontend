import React, { JSXElementConstructor } from 'react'
import { css } from '@emotion/react'
import { Modal, Typography, useTheme, IconButton, Fade } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'

type CustomModalProps = {
  visible: boolean
  closeModal: () => void
  size: number
  children: React.ReactElement<any, string | JSXElementConstructor<any>>
  title: string
}

const CustomModal = ({
  visible,
  closeModal,
  size,
  children,
  title
}: CustomModalProps): JSX.Element => {
  const { shape } = useTheme()
  return (
    <Modal
      open={visible}
      onClose={closeModal}
      aria-labelledby="modal-title"
      closeAfterTransition
      css={styles.modal}
    >
      <Fade in={visible}>
        <div
          css={[
            styles.modalContainer,
            { maxWidth: `${size}px`, borderRadius: shape.borderRadius }
          ]}
        >
          <div css={styles.header}>
            <Typography
              variant="h5"
              id="modal-title"
              css={css`
                text-transform: capitalize;
              `}
            >
              {title}
            </Typography>
            <IconButton onClick={closeModal}>
              <CloseIcon />
            </IconButton>
          </div>

          {children}
        </div>
      </Fade>
    </Modal>
  )
}

const styles = {
  modal: css({
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    paddingTop: '80px'
  }),
  modalContainer: css({
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
    padding: '30px',
    paddingTop: '20px',
    height: 'fit-content',
    outline: 'none'
  }),
  header: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
  })
}

export default CustomModal
