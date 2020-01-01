import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = (props) => {
  const getBlogTable = () => {
    return props.users.map(user => {
      return { name: user.name, numBlogs: user.blogs.reduce((p) => p + 1, 0), id: user.id }
    })
  }

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody data-cy="users-table">
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {getBlogTable().map(e => <tr key={e.id}><th><Link to={`/users/${e.id}`}>{e.name}</Link></th><th>{e.numBlogs}</th></tr>)}
        </tbody>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(Users)