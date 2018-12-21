import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
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
            <li key={e.id}>{e.title}</li>
          ))}
        </ul>
      )
    return <Main>{list}</Main>
  }
}

export default Topics
const Main = styled.div`
  .list {
    padding: 0;
  }
  .list > li {
    cursor: pointer;
    font-size: 16px;
    line-height: 50px;
    list-style: none;
    border: 1px solid #f0f0f0;
    :hover {
      background-color: #f6f6f6;
      text-decoration: underline;
    }
  }
`
