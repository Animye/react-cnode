import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import 'moment/locale/zh-cn'
import Moment from 'react-moment'
class Topics extends Component {
  state = {
    topics: []
  }
  componentDidMount() {
    const { pathname } = this.props.location

    // console.log(pathname.replace('/', ''))
    axios
      .get(`https://cnodejs.org/api/v1/topics?tab=${pathname.replace('/', '')}`)
      .then(res => {
        this.setState({
          topics: res.data.data
        })
      })
  }
  render() {
    const { topics } = this.state
    const list =
      topics.length === 0 ? (
        '请稍等'
      ) : (
        <ul className='list'>
          {topics.map(e => (
            <li key={e.id}>
              <Link to={`/user/${e.author.loginname}`}>
                <img src={e.author.avatar_url} alt='' />
              </Link>
              <span className='count'>
                <span title='回复数'>{e.reply_count}</span>/{' '}
                <span title='阅读量'>{e.visit_count}</span>
              </span>
              {e.top ? <span className='top'>置顶</span> : ''}
              <Link className='text' to={`/topic/${e.id}`}>
                <span className='title'> {e.title}</span>
                <Moment className='time' fromNow locale='zh-cn'>
                  {e.last_reply_at}
                </Moment>
              </Link>
            </li>
          ))}
        </ul>
      )
    return <Main>{list}</Main>
  }
  // addUser = event => {
  //   console.log(event.target.nodeName)
  // }
}

export default Topics
const Main = styled.div`
  .list {
    padding-left: 0;
  }
  .list > li {
    cursor: pointer;

    height: 50px;
    display: flex;
    align-items: center;
    list-style: none;
    border: 1px solid #f0f0f0;
    :hover {
      background-color: #f6f6f6;
    }
  }
  .text {
    display: flex;
    flex-grow: 1;
    color: #333333;
    font-size: 16px;

    justify-content: space-between;
    :hover {
      text-decoration: underline;
    }
  }
  .text > .title {
    width: 700px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .text > .time {
    /* overflow: hidden;
    text-overflow: ellipsis; */
    width: 75px;
    text-align: right;
    color: #888;

    margin-right: 20px;
  }
  img {
    width: 30px;
    border-radius: 3px;
    margin-left: 8px;
    flex-shrink: 0;
  }
  .count {
    width: 70px;
    font-size: 12px;
    margin-left: 10px;
    flex-shrink: 0;
    text-align: center;
  }
  .top {
    padding: 2px;
    background-color: #80bd01;
    color: #fff;
    flex-shrink: 0;
    font-size: 12px;
    margin-right: 8px;
    border-radius: 4px;
  }
`
