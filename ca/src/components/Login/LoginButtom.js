import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {grey50} from 'material-ui/styles/colors';

class LoginButtom extends React.Component{


    render() {
        return (
			<RaisedButton label="Login"
						  backgroundColor = "#00AEAE"
						  labelColor = {grey50}
						  href="/auth/Nctu"
						  style={{
                              width: '30%',
                              fontFamily: 'Noto Sans CJK TC',
                              float: 'left',
                              margin: '2px'
                          }}
						  onTouchTap={
                              () => this.kk()
                          }
			>
			</RaisedButton>
        );
	}

    kk (event){
        console.log('1234567');
    }
}


export default LoginButtom;