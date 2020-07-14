import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import Nav from './Nav'
import QPage from './QPage'
import CreateQ from './CreateQ'
import Leaderboard from './Leaderboard';
import Error from './Error'
import SignIn from './SignIn'

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
              ? <p>Loading</p>
              : <div>
                {this.props.authedUser
                  ? <Switch>
                      <Route exact path='/'  component={Dashboard}/>
                      <Route exact path='/question/:id' component={QPage}/>
                      <Route exact path='/add'  component={CreateQ}/>
                      <Route exact path='/leaderboard'  component={Leaderboard}/> 
                      <Route component={Error}/>
                    </Switch>
                  : <div>
                      <Route path='*' component={SignIn}/>
                    </div>
                }                  
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
    loading: false,
    authedUser
  }
}

export default connect(mapStateToProps)(App)
