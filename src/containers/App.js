import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Card, Avatar, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import LinkList from './LinkList'
import { getLinks } from '../redux/Modules/links'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      order: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    const { getLinks } = this.props
    getLinks(event.target.value)
    this.setState({ order: event.target.value })
  }

  render() {
    const { history } = this.props
    const { order } = this.state

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
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl variant="filled">
              <InputLabel id="select-label">Order by</InputLabel>
              <Select
                labelId="select-label"
                onChange={this.handleChange}
                className='select'
                value={order}
              >
              <MenuItem value='desc'>Most Voted (Z > A)</MenuItem>
              <MenuItem value='asc'>Less Voted (A > Z)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <LinkList />
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default connect(null, {getLinks})(App)