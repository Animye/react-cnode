import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Link } from 'react-router-dom'
class Create extends Component {
  state = {
    token: '5331e48f-1f71-4511-ad10-a3c2a6ee758a',
    title: '',
    tab: 'dev',
    content: ''
  }
  render() {
    const { title, content } = this.state
    return (
      <Wrap>
        <div className='top'>
          <Link to='/'>主页</Link>
          <span>/ 发布话题</span>
        </div>
        <input
          className='title'
          type='text'
          value={title}
          placeholder='标题字数十字以上'
          onChange={this.handleText}
        />
        <textarea
          className='content'
          value={content}
          onChange={this.handleArea}
        />
        <button onClick={this.add}>提交</button>
      </Wrap>
    )
  }
  handleText = event => {
    this.setState({
      title: event.target.value
    })
  }
  handleArea = event => {
    this.setState({
      content: event.target.value
    })
  }
  add = () => {
    const { token, title, tab, content } = this.state
    axios
      .post('https://cnodejs.org/api/v1/topics', {
        accesstoken: token,
        title: title,
        tab: tab,
        content: content
      })
      .then(res => {})
  }
}
export default Create
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
  .title {
    display: block;
    font-size: 14px;
    width: 99%;
    line-height: 40px;

    outline: 0;
    margin: 20px 0;
  }
  .content {
    width: 99%;
    height: 200px;
    outline: 0;
  }
`
