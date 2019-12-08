import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getLinks, updatePoints } from '../redux/Modules/links'
import { Card, Grid, Button } from '@material-ui/core'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

class LinkList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      links: this.props.links
    }
  }

  componentDidMount () {
    const { getLinks } = this.props
    getLinks()
  }
  
  renderLinks () {
    const { links, updatePoints } = this.props
    return links.length > 0 ? links.map(link => {
      return (
        <Card key={link.link_name} className='card'>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <div className='card__avatar'>
                <label className='card__avatar-points'>{link.points}</label>
                <label className='card__avatar-text'>POINTS</label>
              </div>
            </Grid>
            <Grid item xs={10}>
              <label className='card__link-name'>{link.link_name}</label>
              <label className='card__link'>(<a href={link.link_url} target='_blank'>{link.link_url}</a>)</label>
              <Button onClick={() => { updatePoints(link.id, true) }}><ArrowUpwardIcon fontSize="inherit" /> Up Vote</Button>
              <Button onClick={() => { updatePoints(link.id, false) }}><ArrowDownwardIcon fontSize="inherit" />Down Vote</Button>
            </Grid>
          </Grid>
        </Card>
      )       
    }) : null
  }

  render() {
    return(
      <div>{this.renderLinks()}</div>
    )
  }
};

const mapStateToProps = ({links}) => {
  return {
    links
  }
}

export default connect(mapStateToProps, {getLinks, updatePoints})(LinkList)
