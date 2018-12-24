import React, { Component } from 'react'
import '../static/gloable.css'
import Header from './Header/Header'
// import Home from './Home/Home'
// import styled from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'
import Main from './Main/Main'
class App extends Component {
  state = {
    isLogin: false
  }
  componentDidMount() {
    const { loginname, avatar_url } = sessionStorage
    this.setState({
      isLogin: loginname && avatar_url ? true : false
    })
  }

  render() {
    const { isLogin } = this.state
    return (
      <Router>
        <div style={{ backgroundColor: '#e1e1e1' }}>
          <Header setLogin={this.setLogin} />
          <Main isLogin={isLogin} />
        </div>
      </Router>
    )
  }
  setLogin = bool => {
    this.setState({
      isLogin: bool
    })
  }
}

export default App
