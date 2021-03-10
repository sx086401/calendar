import { Grid, makeStyles, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { getDay, startOfMonth, lastDayOfMonth, getDate } from 'date-fns'
import { addDays } from 'date-fns/esm'
import React from 'react'
import CalendarCell from './CalendarCell'

const useStyle = makeStyles({
  title: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: 'xxx-large',
    color: 'white',
    marginTop: 10,
  },
  calendar: {
    backgroundColor: 'rgb(139, 144, 152, 0.5)',
    border: 'solid 1px',
    margin: 10,
    padding: 10,
    borderCollapse: 'collapse',
    borderRadius: 4,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: 'rgb(59, 47, 52, 0.5)',
    color: 'white',
    cursor: 'default',
  },
  headerCell: {
    color: 'white',
    textAlign: 'center',
  },
  tableCell: {
    color: 'white',
    padding: 0,
    borderTop: 'solid 1px rgb(224, 224, 224)',
    borderBottom: 'none'
  }
})

function getDates(startDate: Date, endDate: Date) {
  let dates = []
  let currentDate = startDate
  while (currentDate <= endDate) {
    dates.push(getDate(currentDate))
    currentDate = addDays(currentDate, 1)
  }
  return dates
}

function chunkWeeks(dates: number[]) {
  let result = []
  for (let i = 0; i < dates.length; i += 7) {
    result.push(dates.slice(i, i + 7))
  }
  return result
}

export default function Calendar() {
  const classes = useStyle()
  const tableHead = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const now = new Date()
  const startDateOfMonth = startOfMonth(now)
  const startDayOfMonth = getDay(startDateOfMonth)
  const startDateOfCalendar = addDays(startDateOfMonth, -startDayOfMonth)
  const finalDateOfMonth = lastDayOfMonth(now)
  const finalDayOfMonth = getDay(finalDateOfMonth)
  const finalDayOfCalendar = addDays(finalDateOfMonth, 6-finalDayOfMonth)
  const dates = getDates(startDateOfCalendar, finalDayOfCalendar)
  const weeks = chunkWeeks(dates)

  return (
    <Grid container spacing={3}>
      <Grid item md={1}></Grid>
      <Grid item xs={12} md={10}>
        <div className={classes.title}>{now.toLocaleDateString('en-US', {year: 'numeric', month: 'long'})}</div>
        <Table className={classes.calendar}>
          <TableHead className={classes.header}>
            <TableRow>
              {tableHead.map(head => <TableCell className={classes.headerCell} key={head}>{head}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {weeks.map((week, idx) =>
              <TableRow key={idx}>
                {week.map(day =>
                  <TableCell className={classes.tableCell} key={day}><CalendarCell day={day}/></TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Grid>
      <Grid item md={1}></Grid>
    </Grid>
  )
}
