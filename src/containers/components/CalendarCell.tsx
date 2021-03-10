import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'

const useStyle = makeStyles({
  cell: {
    display: 'flex',
    flexWrap: 'wrap',
    cursor: 'pointer',
    height: '100px',
    width: '100%',
    '&:hover': {
      backgroundColor: 'rgb(139, 144, 152, 0.5)'
    },
    '& .title': {
      textAlign: 'center',
      margin: 5,
      width: '100%',
      height: 10
    },
    '& .note': {
      width: '100%',
      lineHeight: '1.4em',
      maxHeight: '2.8em',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      padding: 1,
    }
  },
  dialog: {
    backgroundColor: 'rgb(244, 244, 244, 0.8)',
    overflow: 'hidden',
    '& .content': {
      backgroundColor: 'rgb(39, 44, 52, 0.7)',
      color: 'white'
    }
  },
  textArea: {
    resize: 'none',
    outline: 'none',
    backgroundColor: 'rgb(39, 44, 52, 0.1)',
    color: 'white',
    fontSize: 18,
    width: 380,
    height: 300,
  },
  button: {
    color: 'white'
  }
})

interface Props {
  day: number
}

export default function CalendarCell(props: Props) {
  const { day } = props
  const classes = useStyle()
  const [showDialog, toggleDialog] = useState(false)

  const onClose = () => {
    toggleDialog(false)
  }

  return <>
    <div className={classes.cell} onClick={() => toggleDialog(true)}>
      <div className={'title'}>{day}</div>
      <Typography variant="body1" align='center' className={'note'}>something to do on day {day}</Typography>
    </div>
    <Dialog className={classes.dialog} open={showDialog}>
      <DialogTitle className='content'>{day}'s schedule</DialogTitle>
      <DialogContent className='content' dividers>
        <textarea className={classes.textArea}></textarea>
      </DialogContent>
      <DialogActions className='content'>
        <Button className={classes.button} onClick={onClose}>cancel</Button>
        <Button className={classes.button} onClick={onClose}>confirm</Button>
      </DialogActions>
    </Dialog>
  </>
}
