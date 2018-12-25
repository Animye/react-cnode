import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { filter } from '../../static/filter.js'
class Topic extends Component {
  state = {
    topic: null,
    comment: '',
    otherComment: ''
  }
  componentDidMount() {
    this.getTopic()
  }
  getTopic = () => {
    //登录和未登录 请求的文章详情要是不同参数的
    // const { isShowArea } = this.state
    const { id } = this.props.match.params
    const { token } = sessionStorage
    axios
      .get(
        `https://cnodejs.org/api/v1/topic/${id}?${
          token ? `accesstoken=${token} ` : ''
        }`
      )
      .then(res => {
        res.data.data.replies = res.data.data.replies.map(e => {
          e.isShowArea = false
          return e
        })
        this.setState({
          topic: res.data.data
        })
      })
  }
  render() {
    const { topic, comment, otherComment } = this.state
    const { token } = sessionStorage
    console.log(topic)

    const article = topic ? (
      <Article>
        <h2>{topic.title}</h2>
        <span>
          ·作者{topic.author.loginname} ·来自{filter(topic.tab)}
        </span>
        {token ? (
          <button
            onClick={() => {
              this.collect(topic.id)
            }}
          >
            {topic.is_collect ? '取消收藏' : '收藏'}
          </button>
        ) : (
          ''
        )}
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
                <button
                  onClick={() => {
                    this.ups(replie.id)
                  }}
                >
                  点赞
                </button>
                <span>点赞数：{replie.ups.length}</span>
                <button
                  onClick={() => {
                    this.showArea(replie.id, replie.author.loginname)
                  }}
                >
                  回复
                </button>
                <p dangerouslySetInnerHTML={{ __html: replie.content }} />

                {replie.isShowArea ? (
                  <div>
                    <textarea
                      name='otherComment'
                      onChange={this.handleText}
                      value={otherComment}
                    />
                    <button
                      onClick={() => {
                        this.addOtherComment(replie.id)
                      }}
                    >
                      回复
                    </button>
                  </div>
                ) : (
                  ''
                )}
              </li>
            ))}
          </ul>
          {token ? (
            <div>
              <h4>添加回复</h4>
              <textarea
                value={comment}
                onChange={this.handleText}
                name='comment'
              />
              } <button onClick={this.addComment}>评论</button>
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
      [e.target.name]: e.target.value
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
  showArea = (id, loginname) => {
    const { topic } = this.state
    const newTopic = { ...topic }
    if (newTopic.replies.find(e => e.isShowArea === true)) {
      newTopic.replies.find(e => e.isShowArea === true).isShowArea = false
    }
    newTopic.replies.find(e => e.id === id).isShowArea = true
    this.setState({
      topic: newTopic,
      otherComment: `@${loginname} `
    })
  }
  addOtherComment = id => {
    const { topic, otherComment } = this.state
    const { token } = sessionStorage
    axios
      .post(`https://cnodejs.org/api/v1/topic/${topic.id}/replies`, {
        accesstoken: token,
        content: otherComment,
        reply_id: id
      })
      .then(res => {
        this.getTopic()
        this.setState({
          otherComment: ''
        })
      })
  }
  ups = id => {
    const { token } = sessionStorage
    const { topic } = this.state
    axios
      .post(`https://cnodejs.org/api/v1/reply/${id}/ups`, {
        accesstoken: token
      })
      .then(res => {
        const userId = sessionStorage.id
        const newTopic = { ...topic }
        if (res.data.action === 'up') {
          newTopic.replies.find(e => e.id === id).ups.push(userId)
        } else {
          newTopic.replies.find(e => e.id === id).ups = newTopic.replies
            .find(e => e.id === id)
            .ups.filter(e => e !== userId)
        }
        this.setState({
          topic: newTopic
        })
      })
  }
  collect = id => {
    const { token } = sessionStorage
    const { topic } = this.state
    const is_collect = topic.is_collect
    axios
      .post(
        `https://cnodejs.org/api/v1/topic_collect/${
          is_collect ? 'de_collect' : 'collect'
        }`,
        {
          accesstoken: token,
          topic_id: id
        }
      )
      .then(res => {
        const newTopic = { ...topic }
        newTopic.is_collect = !newTopic.is_collect
        this.setState({
          topic: newTopic
        })
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
