import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, TextareaAutosize } from '@material-ui/core'
import React, { useState } from 'react'

const useStyle = makeStyles({
  cell: {
    display: 'flex',
    flexWrap: 'wrap',
    cursor: 'pointer',
    height: '100px',
    width: '100%',
    '&:hover': {
      backgroundColor: 'rgb(244, 244, 244)'
    },
    '& .title': {
      textAlign: 'center',
      marginTop: 5,
      width: '100%',
    }
  }
})

interface Props {
  day: number
}

export default function CalendarCell(props: Props) {
  const { day } = props
  const classes = useStyle()
  const [showDialog, toggleDialog] = useState(false)

  return <>
    <div className={classes.cell} onClick={() => toggleDialog(true)}>
      <div className={'title'}>{day}</div>
      <div>something to do</div>
    </div>
    <Dialog open={showDialog}>
      <DialogTitle>{day}'s schedule</DialogTitle>
      <DialogContent>
        <TextareaAutosize style={{width: 280, height: 100}}></TextareaAutosize>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => toggleDialog(false)}>confirm</Button>
      </DialogActions>
    </Dialog>
  </>
}
