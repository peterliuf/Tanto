// TODO: add flow annotations

import React, { Component } from 'react'
import { ListGroup, Pagination } from 'react-bootstrap'
import './styles.css'

class List extends Component {
  constructor(props) {
    super(props)
    this.state = { activePage: this.props.activePage }
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(eventKey: number) {
    this.setState({
      activePage: eventKey,
    })
    if (this.props.onPageSelect) {
      this.props.onPageSelect(eventKey)
    }
  }

  render() {
    return (
      <div>
        <ListGroup
          fill
          className="list-group"
        >
          {this.props.children}
        </ListGroup>

        {this.props.totalPagesCount > 0 &&
          <div className="pagination-parent">
            <Pagination
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              items={this.props.totalPagesCount}
              maxButtons={5}
              activePage={this.state.activePage}
              onSelect={this.handleSelect}
              className="pagination"
            />
          </div>
        }
      </div>
    )
  }
}

export default List
