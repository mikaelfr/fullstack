import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const User = (props) => {

  if (props.user === undefined || props.user.blogs === undefined) {
    return null
  }

  return (
    <div>
      <h2>{props.user.name}</h2>
      <h4>Added blogs</h4>
      <Table striped>
        <tbody>
          {props.user.blogs.map(e =>
            <tr key={e.id}>
              <td>
                <Link to={`/blogs/${e.id}`}>{e.title}</Link> by {e.author}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

const mapStateToProps = (state, props) => {
  return {
    user: state.users.filter(u => u.id === props.id)[0]
  }
}

export default connect(mapStateToProps)(User)