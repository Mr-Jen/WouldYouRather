import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import Nav from './Nav'

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
                </div>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

export default connect()(App)
