import React from 'react';
import ListComponent from '../list/list';
class MainComponent extends React.Component{
    
render(){
    return(
        <div className='mainContainer'>
            <ListComponent />
        </div>
    )
}

};
module.exports=MainComponent;