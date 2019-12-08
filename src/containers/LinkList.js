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
      links: this.props.links,
      currentPage: 1,
      linksPerPage: 5
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    const { getLinks } = this.props
    getLinks()
  }
  
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    const { links, updatePoints, getLinks } = this.props
    const { currentPage, linksPerPage } = this.state

    // Logic for displaying current links
    const indexOfLastLink = currentPage * linksPerPage;
    const indexOfFirstLink = indexOfLastLink - linksPerPage;
    const currentLinks = links && links.length > 0 ? links.slice(indexOfFirstLink, indexOfLastLink) : null

    const renderLinks = currentLinks && currentLinks.length > 0 ? currentLinks.map(link => {
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
              <Button onClick={() => { updatePoints(link.id, true); getLinks() }}><ArrowUpwardIcon fontSize="inherit" /> Up Vote</Button>
              <Button onClick={() => { updatePoints(link.id, false); getLinks() }}><ArrowDownwardIcon fontSize="inherit" />Down Vote</Button>
            </Grid>
          </Grid>
        </Card>
      )       
    }) : null

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(links.length / linksPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });

    return(
      <div>
        {renderLinks}
        <ul className='pagination'>
          {renderPageNumbers}
        </ul>
      </div>
    )
  }
};

const mapStateToProps = ({links}) => {
  return {
    links
  }
}

export default connect(mapStateToProps, {getLinks, updatePoints})(LinkList)
