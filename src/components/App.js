import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import Nav from './Nav'
import QPage from './QPage'
import CreateQ from './CreateQ'
import Leaderboard from './Leaderboard';

class App extends Component {
  componentDidMount (){
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar/>
          <div>
            <Nav info={this.props}/>
            {this.props.loading === true
              ? null
              : <div>
                  <Route path='/' exact component={Dashboard}/>
                  <Route path='/question/:id' exact component={QPage}/>
                  <Route path='/new' exact component={CreateQ}/>
                  <Route path='/leaderboard' exact component={Leaderboard}/>
                </div>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser}){
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
