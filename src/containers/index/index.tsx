import { Button, makeStyles } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyle = makeStyles({
  index: {
    textAlign: 'center',
    marginTop: 300,
    '& .title': {
      fontSize: 60,
      color: 'white'
    },
    '& .link': {
      textDecoration: 'none'
    },
    '& .button': {
      fontSize: 20,
      backgroundColor: 'rgb(139, 144, 152, 0.5)',
      color: 'white',
    }
  }
})

export default function Index() {
  const classes = useStyle()

  return (
    <div className={classes.index}>
      <h1 className='title'>My Calendar</h1>
      <Link className='link' to='/calendar'>
        <Button className='button'>Start</Button>
      </Link>
    </div>
  )
}
