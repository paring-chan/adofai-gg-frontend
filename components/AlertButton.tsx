import React from 'react'
import { Dialog, DialogProps, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'

type FnProps = { open: () => void; close: () => void }

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children?: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide ref={ref} {...props} />
})

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
      <Dialog
        open={open}
        {...dialogProps}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        {children(fnProps)}
      </Dialog>
    </>
  )
}

export default AlertButton
