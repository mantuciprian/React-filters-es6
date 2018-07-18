import React from 'react';
class ListComponent extends React.Component{
 constructor(props) {
     super(props);
     this.state = {
         data: [
             {make: 'BMW', model:'M3', year:2018},
             {make: 'Mercedes', model: 'E200', year:2018}
         ],

         // unitialized car list
         cars: []
     };
 }

 componentWillMount() {
     this.setState({
       cars : this.state.data
     });
 }
render(){
    return(
        <div>

           {this.state.cars.map((v, i)=> {
             return <div className='listItem' key={i}>
             <div className='car'>
             <div className='make' >Make :{v.make}</div>
              <div className='model' >Model:{v.model}</div>
             </div>
             
              <div className='year' >Year :{v.year}</div>
              </div>
           })}

        </div>
    )
}

};
module.exports=ListComponent;