import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { getDay, startOfMonth, lastDayOfMonth, getDate } from 'date-fns'
import { addDays } from 'date-fns/esm'
import React from 'react'

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
    <Table>
      <TableHead>
        <TableRow>
          {tableHead.map(head =>
              <TableCell key={head}>{head}</TableCell>
            )}
        </TableRow>
      </TableHead>
      <TableBody>
        {weeks.map((week, idx) =>
          <TableRow key={idx}>
            {week.map(day =>
              <TableCell key={day}>{day}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
