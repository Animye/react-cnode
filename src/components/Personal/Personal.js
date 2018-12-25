import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Link } from 'react-router-dom'
class Personal extends Component {
  state = {
    personal: {}
  }
  // componentDidMount() {
  //   axios
  //     .post('https://cnodejs.org/api/v1/accesstoken', {
  //       accesstoken: '5331e48f-1f71-4511-ad10-a3c2a6ee758a'
  //     })
  //     .then(res => {
  //       console.log(res.data.loginname)
  //       this.setState({
  //         personal: res.data
  //       })
  //     })
  // }
  componentDidMount() {
    // const loginname = this.props
    // console.log(this.props)
    axios.get('https://cnodejs.org/api/v1/user/Animye ').then(res => {
      this.setState({
        personal: res.data.data
      })
    })
  }
  render() {
    const { personal } = this.state
    const { isLogin } = this.props
    return isLogin ? (
      <Person>
        <h2>
          <span>个人信息</span>
        </h2>
        <div className='top'>
          <Link to={`/user/${personal.loginname}`}>
            <img
              src={personal.avatar_url}
              alt=''
              style={{ width: '48px', marginLeft: 20, marginRight: 20 }}
            />
            <span>{personal.loginname}</span>
          </Link>
        </div>
        <p style={{ marginLeft: 20 }}>积分：{personal.score}</p>
        <Link to='/topic/creat' className='release'>
          发布话题
        </Link>
      </Person>
    ) : (
      <div>请登录</div>
    )
  }
}

export default Personal
const Person = styled.div`
  background-color: #fff;
  width: 290px;
  height: 350px;
  margin-left: 20px;
  padding: 0;
  .top {
    display: flex;
    align-items: center;
  }
  .top > a {
    color: #758087;
  }
  h2 {
    line-height: 40px;
    background-color: #f6f6f6;
    font-size: 13px;
    margin: 0;
    color: #626262;
    margin-bottom: 20px;
  }
  h2 > span {
    margin-left: 20px;
  }
  .release {
    color: #fff;
    background-color: #6ac000;
    margin-left: 20px;
    width: 90px;
    line-height: 34px;
    display: block;
    text-align: center;
    border-radius: 5px;
    transition: all 0.5s;
    :hover {
      background-color: #00c068;
    }
  }
`
