import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../Home/Home'
import styled from 'styled-components'
import Topic from '../Topic/Topic'
import Personal from '../Personal/Personal'
import User from '../User/User'
import Create from '../Create/Create'
class Main extends Component {
  render() {
    const { isLogin } = this.props
    return (
      <Wrap>
        <Switch>
          <Route component={Create} path='/topic/creat' />
          <Route component={User} path='/user/:loginname' />
          <Route component={Topic} path='/topic/:id' />
          <Route component={Home} path='/' />
        </Switch>
        <Personal isLogin={isLogin} />
      </Wrap>
    )
  }
}

export default Main
const Wrap = styled.div`
  display: flex;
  width: 1282px;
  margin: 20px auto 0;
`
