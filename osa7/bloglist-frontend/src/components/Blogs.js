import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Blogs = (props) => {
  if (props.blogs === undefined) {
    return null
  }

  return(
    <Table striped>
      <tbody data-cy="blog-table">
        {props.blogs.map(blog =>
          <tr key={blog.id}>
            <td>
              <Link to={`/blogs/${blog.id}`} data-cy="blog-link">{blog.title}</Link> by {blog.author}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

export default connect(mapStateToProps)(Blogs)