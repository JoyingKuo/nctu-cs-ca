import React from 'react'
import axios from 'axios'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import pic from '../../../Resources/BeautifalGalaxy.jpg'
import defaultPic from '../../../Resources/defalt.jpg'

// mui
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
// for multiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const styles = {
  noticeTitle: {
    fontSize: '2.8em',
    fontWeight: '500',
    color: '#bf6468',
    margin: '32px 0 0 50px',
    float: 'left'
  },
  mainTitle: {
    fontSize: '2.8em',
    fontWeight: '500',
    color: '#666666',
    margin: '32px 0 0 50px',
    float: 'left'
  },
  subTitle: {
    fontSize: '1.2em',
    fontWeight: '4300',
    color: '#737373',
    margin: '55px 0 0 50px',
    float: 'left'
  },
  groups: {
    margin: '0 0 60px 0'
  },
  groupBtn: {
    margin: 30,
    padding: 20,
    background: '#ececec',
    borderRadius: '6px',
    border: '1px #dfdfdf solid'
  },
  groupBtnThisYear: {
    margin: 30,
    padding: 20,
    background: '#f8efdd',
    borderRadius: '6px',
    border: '1px #dfdfdf solid'
  },
  pic: {
    width: '80%'
  },
  groupYear: {
    fontSize: '1.2em',
    fontWeight: '200',
    color: '#575757'
  },
  groupTitle: {
    fontSize: '2em',
    fontWeight: '100',
    color: '#575757'
  },
  chip: {
    margin: 5
  },
  chipWrapper: {
    padding: 5,
    display: 'flex',
    flexWrap: 'wrap'
  },
  groupIntro: {
    padding: 5,
    color: '#9c9c9c',
    fontSize: '1.4em',
    fontWeight: 100
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

class GroupList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      total_number: 3,
      groupList: [
        { research_title: '資料錯誤',
          participants: [
            { student_id: '0399999',
              sname: '陳罐頭',
              detail: '資工系 網多組3 '
            }
          ],
          year: '106'
        }
      ]
    }
  }
  fetchData () {
    console.log(this.props.idCard.name)
    axios.get('/professors/students/projects', {
      // name: '彭文志'
      // name: this.props.idCard.name
      id: this.props.idCard.id
    }).then(res => {
      this.setState({
        total_number: res.data.total_number,
        groupList: res.data.groups
      })
    }).catch(err => {
      console.log(err)
    })
  }
  componentDidMount () {
    this.fetchData()
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.idCard !== nextProps.idCard) {
      console.log(nextProps)
      this.fetchData()
    }
  }
  render () {
    const tn = this.state.total_number
    return (
      <Grid>
        <Row>
          <Col xs={12} md={4} lg={4}>
            <div style={styles.mainTitle}> 學生專題列表 </div>
          </Col>
          <Col xs={12} md={8} lg={8}>
            <div style={styles.subTitle}> 本年度已收專題學生: {tn} 人 </div>
          </Col>
        </Row>
        <Row style={styles.groups}>
          {this.state.groupList.map((item) => (
            <GroupButton
              title={item.research_title}
              participants={item.participants}
              year={item.year}
            />
          ))}
        </Row>
      </Grid>
    )
  }
}
export default GroupList

const GroupButton = (props) => (
  <Grid style={props.year === '106' ? styles.groupBtnThisYear : styles.groupBtn}>
    <Row>
      <Col xs={3} md={3} lg={3}>
        <Image style={styles.pic} src={pic} circle />
      </Col>
      <Col xs={9} md={9} lg={9}>
        <div style={styles.groupYear}>{props.year}年度</div>
        <div style={styles.groupTitle}>{props.title}</div>
        <div>
          <MuiThemeProvider>
            <div style={styles.chipWrapper}>
              {props.participants.map((item) => (
                <Chip style={styles.chip}>
                  <Avatar src={defaultPic} /> {item.student_id} {item.sname}
                </Chip>
              ))}
            </div>
          </MuiThemeProvider>
        </div>
        <div style={styles.groupIntro}>
          (尚未取得專題簡介的資料。)
        </div>
      </Col>
    </Row>
  </Grid>
)
