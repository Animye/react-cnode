import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
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
              <img src={e.author.avatar_url} alt='' />{' '}
              <span>
                <span title='回复数'>{e.reply_count}</span>/{' '}
                <span title='阅读量'>{e.visit_count}</span>
              </span>
              {e.top ? <span>置顶</span> : ''}
              <Link to={`/topic/${e.id}`}>
                {e.title} <span>1 小时</span>
              </Link>
            </li>
          ))}
        </ul>
      )
    return <Main>{list}</Main>
  }
}

export default Topics
const Main = styled.div`
  .list {
    padding-left: 0;
  }
  .list > li {
    cursor: pointer;
    font-size: 16px;
    height: 50px;
    display: flex;
    align-items: center;
    list-style: none;
    border: 1px solid #f0f0f0;
    :hover {
      background-color: #f6f6f6;
      text-decoration: underline;
    }
  }
  img {
    width: 30px;
  }
`
