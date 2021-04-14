import React, { useState } from 'react'
import { Grid, makeStyles, styled, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { getDay, startOfMonth, lastDayOfMonth, addMonths } from 'date-fns'
import { addDays } from 'date-fns/esm'
import keyboardArrowLeft from '../../assets/keyboard_arrow_left.svg'
import keyboardArrowRight from '../../assets/keyboard_arrow_right.svg'
import CalendarCell from './CalendarCell'
import TodaySchedule from './TodaySchedule'

const useStyle = makeStyles({
  title: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: 'xxx-large',
    color: 'white',
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

const Banner = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 5,
  padding: 5,
  '& .img': {
    '&:hover': {
      cursor: 'pointer',
    }
  }
})

function getDates(startDate: Date, endDate: Date): Date[] {
  let dates = []
  let currentDate = startDate
  while (currentDate <= endDate) {
    dates.push(currentDate)
    currentDate = addDays(currentDate, 1)
  }
  return dates
}

function chunkWeeks(dates: Date[]): Array<Date[]> {
  let result = []
  for (let i = 0; i < dates.length; i += 7) {
    result.push(dates.slice(i, i + 7))
  }
  return result
}

interface contextValue {
  todaySchedule: string,
  updateTodaySchedule: any
}

const defaultContext: contextValue = { todaySchedule: '', updateTodaySchedule: null}

export const CalendarContext = React.createContext(defaultContext)

export default function Calendar() {
  const classes = useStyle()
  const tableHead = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const now = new Date()
  const [current, setCurrent] = useState<Date>(now)
  const [todaySchedule, updateTodaySchedule] = useState('hahaha')

  const startDateOfMonth = startOfMonth(current)
  const startDayOfMonth = getDay(startDateOfMonth)
  const startDateOfCalendar = addDays(startDateOfMonth, -startDayOfMonth)
  const finalDateOfMonth = lastDayOfMonth(current)
  const finalDayOfMonth = getDay(finalDateOfMonth)
  const finalDayOfCalendar = addDays(finalDateOfMonth, 6-finalDayOfMonth)

  const dates = getDates(startDateOfCalendar, finalDayOfCalendar)
  const weeks = chunkWeeks(dates)

  const previousMonth = () => {
    setCurrent(addMonths(current, -1))
  }

  const nextMonth = () => {
    setCurrent(addMonths(current, 1))
  }

  return (
    <CalendarContext.Provider value={{ todaySchedule, updateTodaySchedule }}>
      <Grid container spacing={0}>
        <Grid item md={2}>
          <TodaySchedule></TodaySchedule>
        </Grid>
        <Grid item xs={12} md={9}>
          <Banner>
            <img className={'img'} src={keyboardArrowLeft} onClick={previousMonth} alt={keyboardArrowRight}></img>
            <div className={classes.title}>{current.toLocaleDateString('en-US', {year: 'numeric', month: 'long'})}</div>
            <img className={'img'} src={keyboardArrowRight} onClick={nextMonth} alt={keyboardArrowRight}></img>
          </Banner>
          <Table className={classes.calendar}>
            <TableHead className={classes.header}>
              <TableRow>
                {tableHead.map(head => <TableCell className={classes.headerCell} key={head}>{head}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {weeks.map((week, row) =>
                <TableRow key={row}>
                  {week.map((date, index) =>
                    <TableCell className={classes.tableCell} key={index}><CalendarCell date={date}/></TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Grid>
        <Grid item md={1}></Grid>
      </Grid>
    </CalendarContext.Provider>
  )
}
