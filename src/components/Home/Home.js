import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Pagination } from 'antd'
class Home extends Component {
  state = {
    topics: [],
    navArr: [
      { type: 'all', txt: '全部' },
      { type: 'good', txt: '精华' },
      { type: 'share', txt: '分享' },
      { type: 'ask', txt: '问答' },
      { type: 'job', txt: '招聘' }
    ]
  }
  componentDidMount() {
    axios.get('https://cnodejs.org/api/v1/topics').then(res => {
      this.setState({
        topics: res.data.data
      })
    })
  }
  choice = type => {
    axios.get(`https://cnodejs.org/api/v1/topics?tab=${type}`).then(res => {
      this.setState({
        topics: res.data.data
      })
    })
  }
  page = page => {
    // const { navArr } = this.state

    // for (let i = 0; i < navArr.length; i++) {
    //   console.log(this[i])
    // }
    axios
      .get(`https://cnodejs.org/api/v1/topics?tab=all&page=${page}`)
      .then(res => {
        this.setState({
          topics: res.data.data
        })
      })
  }
  render() {
    // const navArr = [
    //   { type: 'all', txt: '全部' },
    //   { type: 'good', txt: '精华' },
    //   { type: 'share', txt: '分享' },
    //   { type: 'ask', txt: '问答' },
    //   { type: 'job', txt: '招聘' }
    // ]
    const { topics, navArr } = this.state
    const nav = navArr.map(e => (
      <li
        // style={{
        //   backgroundColor:
        //     navArr.findIndex(a => a.type === e.type) !== -1
        //       ? '#80bd01'
        //       : '#f6f6f6'
        // }}
        key={e.type}
        onClick={() => {
          this.choice(e.type)
        }}
      >
        {e.txt}
      </li>
    ))
    const list =
      topics.length === 0 ? (
        '请稍等'
      ) : (
        <ul className='list'>
          {topics.map(e => (
            <li key={e.id}>{e.title} </li>
          ))}
        </ul>
      )
    return (
      <Wrap>
        <nav>
          <Nav>{nav}</Nav>
        </nav>
        {list}
        <Pagination defaultCurrent={1} total={50} onChange={this.page} />
      </Wrap>
    )
  }
}

export default Home
const Wrap = styled.div`
  width: 960px;
  /* border-radius: 8px; */
  background-color: #fff;
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
const Nav = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;
  display: flex;
  height: 40px;
  background-color: #f6f6f6;
  align-items: center;
  padding-left: 10px;
  li {
    margin-right: 20px;

    cursor: pointer;
    color: #80bd01;
    :hover {
      color: #08c;
    }
  }
`
