import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { filter } from '../../static/filter.js'
class Topic extends Component {
  state = {
    topic: null,
    comment: ''
  }
  componentDidMount() {
    this.getTopic()
  }
  getTopic = () => {
    //登录和未登录 请求的文章详情要是不同参数的
    const { id } = this.props.match.params
    axios.get(`https://cnodejs.org/api/v1/topic/${id}`).then(res => {
      this.setState({
        topic: res.data.data
      })
    })
  }
  render() {
    const { topic, comment } = this.state
    const { token } = sessionStorage
    const article = topic ? (
      <Article>
        <h2>{topic.title}</h2>
        <span>
          ·作者{topic.author.loginname} ·来自{filter(topic.tab)}
        </span>
        <div
          className='content'
          dangerouslySetInnerHTML={{ __html: topic.content }}
        />
        <div>
          <h4>评论</h4>
          <ul style={{ padding: 0 }}>
            {topic.replies.map(replie => (
              <li key={replie.id} style={{ listStyle: 'none' }}>
                <img
                  src={replie.author.avatar_url}
                  alt=''
                  style={{ width: '30px' }}
                />
                <span>{replie.author.loginname}</span>
                <p dangerouslySetInnerHTML={{ __html: replie.content }} />
                <button
                  onClick={() => {
                    this.handleButton(replie.author.loginname)
                  }}
                >
                  回复
                </button>
              </li>
            ))}
          </ul>
          {token ? (
            <div>
              <h4>添加回复</h4>
              <textarea value={comment} onChange={this.handleText} />
              <button onClick={this.addComment}>评论</button>
            </div>
          ) : (
            ''
          )}
        </div>
      </Article>
    ) : (
      <div>请稍等</div>
    )
    return <Wrap>{article}</Wrap>
  }
  handleText = e => {
    this.setState({
      comment: e.target.value
    })
  }
  addComment = () => {
    const { topic, comment } = this.state
    const { token } = sessionStorage
    axios
      .post(`https://cnodejs.org/api/v1//topic/${topic.id}/replies`, {
        accesstoken: token,
        content: comment
      })
      .then(res => {
        this.getTopic()
        this.setState({
          comment: ''
        })
      })
  }
  handleButton = loginname => {
    this.setState({
      comment: `@${loginname} `
    })
  }
}

export default Topic
const Wrap = styled.div`
  width: 960px;
  background-color: #fff;
`
const Article = styled.div`
  .content img {
    width: 100%;
  }
`
