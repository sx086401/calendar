import { Box, makeStyles } from '@material-ui/core'
import React, { useContext } from 'react'
import { CalendarContext } from './Calendar'

const useStyle = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    color: 'white',
    marginTop: 20,
    marginLeft: 10,
    '& .title': {
      width: '100%',
      textAlign: 'center',
      fontSize: 'xx-large',
    },
    '& .content': {
      marginTop: 10,
      fontSize: 'x-large',
      overflowWrap: 'anywhere',
    }
  }
})

export default function TodaySchedule() {
  const calendarContext = useContext(CalendarContext)
  const classes = useStyle()

  return (
    <Box className={classes.root} display={{ xs: 'none', md: 'block'}}>
      <div className='title'>Today schedule</div>
      <div className='content'>{calendarContext.todaySchedule}</div>
    </Box>
  )
}
