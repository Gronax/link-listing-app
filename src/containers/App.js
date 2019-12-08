import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Button } from '@material-ui/core'
import LinkList from './LinkList'

class App extends Component {
  render() {
    return(
      <Container maxWidth="sm">
        <Button variant='outlined' onClick={() => { this.props.history.push('/add');}}>SUBMIT A LINK</Button>
        <LinkList />
      </Container>
    )
  }
};

export default connect()(App);
