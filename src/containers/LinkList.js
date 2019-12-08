import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, TextField, Button } from '@material-ui/core'

class LinkList extends Component {
  render() {
    return(
      <Container maxWidth="sm">
        <Button variant='outlined' onClick={() => { this.props.history.push('/add');}}>SUBMIT A LINK</Button>
      </Container>
    )
  }
};

export default connect()(LinkList);
