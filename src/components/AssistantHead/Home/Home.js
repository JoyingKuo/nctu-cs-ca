import React from 'react';
import index from './DSC03961.png';

const img = index;

class Home extends React.Component{


    render() {
        return (
            <div >
                <img src={img} width="100%" style={{margin:'-150px 0 0 0'}} />
            </div>
        );
    }

}


export default Home;