import React from 'react'
import axios from 'axios'
import Snackbar from 'material-ui/Snackbar'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

// for bootstrap 3
import {Button} from 'react-bootstrap'

// for multiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'

const styles = {
  labelStyle: {
    fontFamily: 'Noto Sans CJK TC',
    color: '#434343',
  },
  titleSender: {
    fontFamily: 'Noto Sans CJK TC',
    padding: '3px 3px 5px 3px',
  },
  title: {
    fontFamily: 'Noto Sans CJK TC',
    padding: '3px 3px 0px 3px',
  },
  items: {
    padding: '2px 0 3px 20px',
  },
  item: {
    display: 'inline-block',
    height: '10px',
    width: 'auto',
    padding: '2px',
    color: '#979797',
    fontSize: '8px',
  },
  itemsBlock: {
    padding: '5px 0 7px 10px',
    maxHeight: 900,
    overflow: 'auto',
  },
  text1: {
    width: '90%',
    padding: '5px',
    fontFamily: 'Noto Sans CJK TC',
  },
  text2: {
    width: '90%',
    padding: '5px',
    fontSize: '12px',
    fontFamily: 'Noto Sans CJK TC',
  },
  reply: {
    default: {
      fontSize: '1.5em',
      fontWeight: '400',
      color: '#575757'
    },
    red: {
      fontSize: '1.5em',
      fontWeight: '400',
      color: '#9f2624'
    },
    brown: {
      fontSize: '1.5em',
      fontWeight: '400',
      color: '#845b2d'
    },
    green: {
      fontSize: '1.5em',
      fontWeight: '400',
      color: '#3c8a63'
    }
  }
}

export default class ScoreDialog extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      open: false,
      score: ['','',''],
      err: ['','',''],
    }
  }

  handleOpen = () => {
    let score = ['','','']
    let err =  ['','','']
    this.setState({open: true, score, err})
  }

  handleClose = (status) => {
    if(status !== 1){
      this.setState({open: false})
    }else if(status === 1 && this.checkAllText() ){
      this.setState({open: false})
      console.log('student_id: ' + this.props.participants[0].student_id)
      console.log('tname: ' + this.props.idCard.name)
      console.log('research_title: ' + this.props.title)
      console.log('first_second: ' + this.props.firstSecond)

      this.props.participants.forEach((item, i) => {
        console.log('new_score[' + i + ']: ' + this.state.score[i])

        axios.post('/professors/students/setScore', {
          student_id: item.student_id,
          tname: this.props.idCard.name,
          research_title: this.props.title,
          first_second: this.props.firstSecond,
          new_score: this.state.score[i]
        }).then(res => {
          // console.log(res)
        }).catch(err => {
          console.log(err)
        })
      })

      this.props.parentFunction()
    }
  }

  checkAllText = () => {
    let score = this.state.score
    let err = this.state.err
    err[0] = ( this.isInt100(score[0]) ? '' :'分數必須是0~100之間的整數' )
    err[1] = ( this.isInt100(score[1]) ? '' :'分數必須是0~100之間的整數' )
    err[2] = ( this.isInt100(score[2]) ? '' :'分數必須是0~100之間的整數' )
    this.setState({err})
    const pass = ( err[0] === '' && err[1] === '' && err[2] === '' );
    if (!pass) alert('分數輸入格式錯誤! 請修正後再送出。')
    return pass
  }

  isInt100 = (value) => {
    let x = parseFloat(value);
    if( isNaN(value) || (x | 0) !== x ) return false
    return x >= 0 && x <= 100
  }

  handleChangeScore0 = (event) => {
    let score = this.state.score
    let err = this.state.err
    score[0] = event.target.value
    err[0] = ( this.isInt100(score[0]) ? '' :'分數必須是0~100之間的整數' )
    this.setState({score, err})
  }

  handleChangeScore1 = (event) => {
    let score = this.state.score
    let err = this.state.err
    score[1] = event.target.value
    err[1] = ( this.isInt100(score[1]) ? '' :'分數必須是0~100之間的整數' )
    this.setState({score, err})
  }

  handleChangeScore2 = (event) => {
    let score = this.state.score
    let err = this.state.err
    score[2] = event.target.value
    err[2] = ( this.isInt100(score[2]) ? '' :'分數必須是0~100之間的整數' )
    this.setState({score, err})
  }

  render () {
    const students = this.props.participants
    const actions = [
      <FlatButton
        label='送出評分'
        primary
        onClick={ () => this.handleClose(1) }
      />,
      <FlatButton
        label='取消'
        secondary
        onClick={ () => this.handleClose(0) }
      />
    ]

    return (
      <div>
        <MuiThemeProvider>
          <div onClick={this.handleOpen}>
            <ReplyStatus status={ students[0].score === null }/>
          </div>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Dialog
            title='專題評分'
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <div style={styles.itemsBlock}>
              {students.map((item, i) => (
                <MuiThemeProvider>
                  <TextField
                    key={i}
                    floatingLabelText={item.student_id + ' ' + item.sname + ' 的分數'}
                    style={styles.text1}
                    value={this.state.score[i]}
                    errorText={this.state.err[i]}
                    onChange={
                      i === 0 ? this.handleChangeScore0 :
                      i === 1 ? this.handleChangeScore1 :
                        this.handleChangeScore2
                    }
                  />
                </MuiThemeProvider>
              ))}
            </div>
          </Dialog>
        </MuiThemeProvider>
      </div>
    )
  }
}

const ReplyStatus = (props) => {
  switch (props.status) {
    case true:
      return <Button bsStyle='primary'>評分</Button>
    case false:
      return <Button bsStyle='success'>重新評分</Button>
    default:
      return <Button bsStyle='primary'>評分</Button>
  }
}