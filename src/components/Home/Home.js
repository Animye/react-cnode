import React, { Component } from 'react'
import styled from 'styled-components'
// import axios from 'axios'
// import { Pagination } from 'antd'
import Topics from '../Topics/Topics'
import { Route, NavLink } from 'react-router-dom'

class Home extends Component {
  // state = {
  //   topics: []
  // }
  // componentDidMount() {
  //   axios.get('https://cnodejs.org/api/v1/topics').then(res => {
  //     this.setState({
  //       topics: res.data.data
  //     })
  //   })
  // }
  // choice = type => {
  //   axios.get(`https://cnodejs.org/api/v1/topics?tab=${type}`).then(res => {
  //     this.setState({
  //       topics: res.data.data
  //     })
  //   })
  // }
  // page = page => {
  //   axios
  //     .get(`https://cnodejs.org/api/v1/topics?tab=all&page=${page}`)
  //     .then(res => {
  //       this.setState({
  //         topics: res.data.data
  //       })
  //     })
  // }
  render() {
    const navArr = [
      { type: 'all', txt: '全部' },
      { type: 'good', txt: '精华' },
      { type: 'share', txt: '分享' },
      { type: 'ask', txt: '问答' },
      { type: 'job', txt: '招聘' }
    ]
    // const { topics } = this.state
    const nav = navArr.map(e => (
      <li
        key={e.type}
        // onClick={() => {
        //   this.choice(e.type)
        // }}
      >
        <NavLink
          to={`/${e.type === 'all' ? '' : e.type}`}
          exact={e.type === 'all' ? true : false}
        >
          {e.txt}
        </NavLink>
      </li>
    ))

    return (
      <Wrap>
        <nav>
          <Nav>{nav}</Nav>
        </nav>
        <>
          <Route component={Topics} path='/' exact />
          <Route component={Topics} path='/good' />
          <Route component={Topics} path='/job' />
          <Route component={Topics} path='/share' />
          <Route component={Topics} path='/ask' />
        </>
        {/* <Pagination defaultCurrent={1} total={50} onChange={this.page} /> */}
      </Wrap>
    )
  }
}

export default Home

const Wrap = styled.div`
  width: 960px;
  /* border-radius: 8px; */
  background-color: #fff;
  /* .list {
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
  } */
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
    width: 60px;
    text-align: center;
    display: flex;
  }
  li > a {
    border-radius: 4px;
    color: #7ac500;
    font-size: 14px;
    :hover {
      color: #08c;
    }
    width: 36px;
  }
  li > .active {
    background-color: #80bd01;
    color: #fff;
  }
`
