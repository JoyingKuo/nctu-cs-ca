import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'

import Login from './Login/Login'
import TeacherHead from './TeacherHead/Head'
import Head from './Head/Head'
import AssistantHead from './AssistantHead/Head'
import StudentDetail from './AssistantHead/Graduation/StudentDetail'
import Footer from './Components/Footer'


injectTapEventPlugin()

const Router = () => (
  <BrowserRouter>
      <div>
          <Switch>
              <Route exact path='/' component={Login} />
              <Route exact path='/students/head' component={Head} />
              <Route exact path='/teachers/head' component={TeacherHead} />
              <Route exact path='/assistants/head' component={AssistantHead} />
              <Route exact path='/assistants/head/s/:sid' component={StudentDetail} />
          </Switch>
          <Route path='/' component={Footer}/>
      </div>
  </BrowserRouter>
)

export default Router

