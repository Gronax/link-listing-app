import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Card, Avatar, Typography, CardMedia, CardContent, Grid } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';

class SubmitNewLink extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log('this.props', this.props)
    return(
      <Container maxWidth="sm">
        <Card onClick={() => { this.props.history.push('/add')}}>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <Avatar variant="rounded">
                <AddIcon />
              </Avatar>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="h5">SUBMIT A LINK</Typography>
            </Grid>
          </Grid>
        </Card>
      </Container>
    )
  }
}

export default connect()(SubmitNewLink)
