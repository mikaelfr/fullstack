const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((a, e) => a + e.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((a, e) => {
    if (!a) return e
    return (a.likes > e.likes) ? a : e
  }, null)
}

const mostBlogs = (blogs) => {
  const a = _.reduce(blogs, (a, v) => {
    if (!a[v.author]) { // if the author is not a key in the accumulated array, set it to 0
      a[v.author] = { 'author': v.author, 'blogs': 0 }
    }

    // and increment it
    a[v.author].blogs++
    return a
  }, {})

  return Object.values(a).reduce((a, e) => {
    if (!a) return e
    return (a.likes > e.likes) ? a : e
  }, null)
}

const mostLikes = (blogs) => {
  const a = _.reduce(blogs, (a, v) => {
    if (!a[v.author]) { // if the author is not a key in the accumulated array, set it to 0
      a[v.author] = { 'author': v.author, 'likes': 0 }
    }

    // and add likes to it
    a[v.author].likes += v.likes
    return a
  }, {})

  return Object.values(a).reduce((a, e) => {
    if (!a) return e
    return (a.likes > e.likes) ? a : e
  }, null)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}