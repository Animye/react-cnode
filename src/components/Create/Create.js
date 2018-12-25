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
        <div>
          <span>选择板块：</span>

          <select name='' id='' style={{ width: 220, height: 30 }}>
            <option value='' selected>
              请选择
            </option>
            <option value=''>分享</option>
            <option value=''>问答</option>
            <option value=''>招聘</option>
            <option value=''>客户端测试</option>
          </select>
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
        <button onClick={this.add} className='up'>
          提交
        </button>
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
  height: 100vh;
  background-color: #fff;
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
    width: 98%;
    line-height: 28px;
    outline: 0;
    border-radius: 4px;
    margin: 20px 0;
    text-indent: 28px;
    border: 1px solid #dfdfdf;
  }
  .content {
    width: 98%;
    height: 400px;
    outline: 0;
    resize: none;
  }
  .up {
    margin-top: 50px;
    margin-left: 20px;
    font-size: 16px;
    width: 80px;
    line-height: 40px;
    color: #fff;
    transition: all 0.5s;
    border-radius: 6px;
    background-color: #0089d1;
    :hover {
      background-color: #0053d4;
    }
  }
`
