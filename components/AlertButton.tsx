import React from 'react'
import { Dialog, DialogProps } from '@mui/material'

type FnProps = { open: () => void; close: () => void }

const AlertButton: React.FC<{
  button: (props: FnProps) => React.ReactNode
  children: (props: FnProps) => React.ReactNode
  dialogProps?: DialogProps
}> = ({ button, children, dialogProps }) => {
  const [open, setOpen] = React.useState(false)

  const fnProps: FnProps = {
    open: () => setOpen(true),
    close: () => setOpen(false)
  }

  return (
    <>
      {button(fnProps)}
      <Dialog open={open} {...dialogProps} onClose={() => setOpen(false)}>
        {children(fnProps)}
      </Dialog>
    </>
  )
}

export default AlertButton
