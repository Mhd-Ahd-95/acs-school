import React from 'react'
import { SnackbarProvider } from 'notistack'
import { IconButton } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
import { AlertProviderStyles } from './alertSanckBar.style'

const AlertProvider = props => {
    const classes = AlertProviderStyles()
    const notistackRef = React.createRef()
    const onClickDismiss = key => () => {
      notistackRef.current.closeSnackbar(key)
    }
    return (
      <SnackbarProvider
        ref={notistackRef}
        maxSnack={5}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        className={classes.root}
        action={(key) =>
          <IconButton
            size='small'
            aria-label='close'
            color='inherit'
            onClick={onClickDismiss(key)}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        }
      >
        {props.children}
      </SnackbarProvider>
    )
  }

  export default AlertProvider