import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Link } from 'react-router-dom'

class User extends Component {
  state = {
    users: {},
    topics: [],
    replies: []
  }
  componentDidMount() {
    const loginname = this.props.match.params.loginname
    axios.get(`https://cnodejs.org/api/v1/user/${loginname}`).then(res => {
      console.log(res.data.data)
      this.setState({
        users: res.data.data,
        topics: res.data.data.recent_topics,
        replies: res.data.data.recent_replies
      })
    })
  }

  render() {
    const { users, topics, replies } = this.state
    const title1 = topics.length ? (
      <ul>
        {topics.map(topic => (
          <li key={topic.id}>
            <Link
              to={`/user/${topic.author.loginname}`}
              onClick={this.forceUpdate}
            >
              <img
                src={topic.author.avatar_url}
                alt=''
                style={{ width: '30px' }}
              />
            </Link>
            <Link to={`/topic/${topic.id}`}>{topic.title}</Link>
          </li>
        ))}
      </ul>
    ) : (
      <div>无话题</div>
    )
    const title2 = replies.length ? (
      <ul>
        {replies.map(replie => (
          <li key={replie.id}>
            <Link
              to={`/user/${replie.author.loginname}`}
              onClick={this.forceUpdate}
            >
              <img
                src={replie.author.avatar_url}
                alt=''
                style={{ width: '30px' }}
              />
            </Link>
            <Link to={`/topic/${replie.id}`}>{replie.title}</Link>
          </li>
        ))}
      </ul>
    ) : (
      <div>无话题</div>
    )

    return (
      <Wrap>
        <div className='top'>
          <Link to='/'>主页</Link>
          <span>/</span>
        </div>
        <div className='main'>
          <div>
            <img src={users.avatar_url} alt='' style={{ width: '48px' }} />
            <span>{users.loginname}</span>
          </div>
          <p>{users.score} 积分</p>
          <p>{topics.length} 个话题收藏</p>
        </div>
        <div className='found'>
          <h3>最新创建的话题</h3>
          {title1}
        </div>
        <div className='join'>
          <h3>最近参与的话题</h3>
          {title2}
        </div>
      </Wrap>
    )
  }
}

export default User
const Wrap = styled.div`
  width: 960px;
  background-color: #e1e1e1;
  .top {
    background-color: #f6f6f6;
  }
  .top > a {
    line-height: 40px;
    color: #6ec000;
    margin-left: 20px;
  }
  .top > span {
    color: #6ec000;
  }
  .main {
    padding-left: 20px;
    padding-top: 20px;
    margin-bottom: 20px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
  }
  .main > div {
    display: flex;
    height: 50px;
    align-items: center;
  }
  .main > div > img {
    margin-right: 20px;
  }
  .main > div > span {
    margin-bottom: 20px;
  }
  h3 {
    background-color: #f6f6f6;
    line-height: 40px;
    color: #626262;
    font-weight: 100;
    padding-left: 20px;
    font-size: 14px;
    margin: 0;
  }
  .found {
    background-color: #fff;
  }
  .join {
    background-color: #fff;
  }
  ul {
    display: flex;
    flex-direction: column;
    padding: 0;
  }
  ul > li {
    list-style: none;

    display: flex;
    height: 50px;
    align-items: center;
    border: 1px solid #f0f0f0;
  }
  ul > li > a {
    color: #0095d6;
    margin-left: 20px;
  }
`
