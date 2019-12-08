import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Card, Avatar, Typography, Grid } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import SubmitNewLink from './SubmitNewLink'
import LinkList from './LinkList'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { history } = this.props

    return(
      <Container maxWidth="xs">
        <Card onClick={() => { history.push('/add')} } className='button'>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <Avatar variant="rounded" className='button__avatar' children={<AddIcon fontSize="large" />} />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="h5" className='button__text'>SUBMIT A LINK</Typography>
            </Grid>
          </Grid>
        </Card>
        <LinkList />
      </Container>
    )
  }
}

export default connect()(App)