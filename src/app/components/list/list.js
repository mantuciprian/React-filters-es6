import React from 'react';
class ListComponent extends React.Component{
 constructor(props) {
     super(props);
     this.state = {
         data: [
             {make: 'BMW', model:'M3', year:2018,price:5600, country:'Germany', fuel:'gassoline', hp:'560', body:'coupe', color:'white'},
             {make: 'Mercedes', model: 'E200', year:2018, price:7000, country:'Germany', fuel:'diesel', hp:'420', body:'sedan', color:'black'}
         ],

         // unitialized car list
         cars: []
     };
 }

 componentWillMount() {
     this.setState({
       cars : this.state.data
     });

     this.searchItem = this.searchItem.bind(this); 
 }
render() {
    return(
        <div className='mainContainer'>
    
            <div className ='listContainer'>
            
            <div className='search'>
            <div className="material-icons searchloop">
            <div className='loop'>search</div>
            </div> 
            <input onChange={this.searchItem} className='itemField'/>
            </div>
           {this.state.cars.map((v, i)=> {
             return <div className='listItem' key={i}>
             <div className='car'>
             <div className='make' >Make :{v.make}</div>
              <div className='model' >Model:{v.model}</div>
             </div>
             
              <div className='year' >Year :{v.year}</div>
              <div className='section'></div>
              <div className='specs'>
              <div className='country'>Country: {v.country}</div>
              <div className='hp'>Hp: {v.hp}</div>
              <div className='fuel'>Fuel: {v.fuel}</div>
              <div className='color'>Color: {v.color}</div>
              <div className='price'>Price: {v.price} $</div>
              </div>

              </div>
              
           })}
            
            </div>

            <div className='filtersContainer'>
            <div>Filter by:</div>
            <div className='triangle'><i className="material-icons trig-ico">expand_more</i></div>

            <div className='price-f'>
             <button>ASC Price</button>
             <button>DESC Price</button>
            </div>

            </div> 
            

        </div>
    )
}

searchItem(event) {
  let list = this.state.data
  let searched = event.target.value.toLowerCase();
  this.setState({
     cars: list.filter((v) => {
         if(v.make.toLowerCase().indexOf(searched) !== -1 || v.model.toLowerCase().indexOf(searched) !== -1) {
             return v;
         };
     })
  });
}

};
module.exports=ListComponent;