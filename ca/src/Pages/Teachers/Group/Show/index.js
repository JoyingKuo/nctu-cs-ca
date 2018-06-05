import './style.css'
import img from './1.jpg'
import React from 'react'
import { Image } from 'react-bootstrap'
import IconButton from 'material-ui/IconButton'
import ActionHome from 'material-ui/svg-icons/hardware/keyboard-backspace'

const styles = {
  largeIcon: {
    width: 40,
    height: 40,
    zIndex: 100
  },
  large: {
    width: 100,
    height: 100,
    padding: 30
  }
}

export default class Show extends React.Component {
  render () {
    console.log(this.props.show.image)
    return (
      <div className='container'>
        <IconButton
          iconStyle={styles.largeIcon}
          style={styles.large}
          onClick={() => this.props.onclick()}
        >
          <ActionHome />
        </IconButton>
        <div className=' col-md-12 offset-1'>
          <div className='banner-wrapper'>
            <Image
              alt='無圖片'
              width='1200' height='400'
              src={this.props.show.image !== undefined ? this.props.show.image : img}
              responsive
              rounded
           />
          </div>
          <div className='event-title'>{ this.props.show.research_title }</div>
          <div className='event-info-wrapper bg-white'>
            <div className='row'>
              <div className='col-7'>
                <p><i className='glyphicon glyphicon-file' /> 團隊報告: <a href={this.props.file === '' ? this.props.show.file : this.props.file} style={{cursor: 'pointer'}}>點這裡</a></p>
              </div>
            </div>
            <br />
            <div className='divide-horizontal '>
              <div className='divide-horizontal-span'>
                <p >專題簡介</p>
              </div>
            </div>
            <section dangerouslySetInnerHTML={{__html: this.props.show.intro}} />
          </div>
        </div>
      </div>
    )
  }
}