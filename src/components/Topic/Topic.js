import React, { Component } from 'react'
import axios from 'axios'
class Topic extends Component {
  state = {
    topic: null
  }
  componentDidMount() {
    //登录和未登录 请求的文章详情要是不同参数的
    const { id } = this.props.match.params
    console.log(id)
    axios.get(`https://cnodejs.org/api/v1/topic/${id}`).then(res => {
      console.log(res.data.data)

      this.setState({
        topic: res.data.data
      })
    })
  }
  render() {
    const { topic } = this.state
    const article = topic ? (
      <div>
        <h2>{topic.title}</h2>
      </div>
    ) : (
      <div>请稍等</div>
    )
    return article
  }
}

export default Topic
