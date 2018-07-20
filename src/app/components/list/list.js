import React from 'react';
class ListComponent extends React.Component{
 constructor(props) {
     super(props);
     this.state = {
         data: [
             {make: 'BMW', model:'M3', year:2018,price:56000, country:'Germany', fuel:'gassoline', hp:'560', body:'coupe', color:'white'},
             {make: 'Audi', model: 'Q7', year:2018, price:81000, country:'Germany', fuel:'diesel', hp:'390', body:'SUV', color:'silver'},
             {make: 'Mercedes', model: 'E200', year:2018, price:70000, country:'Germany', fuel:'diesel', hp:'420', body:'sedan', color:'black'},
             {make: 'Hyundai', model: 'i20', year:2016, price:27000, country:'Japan', fuel:'gassoline', hp:'120', body:'sedan', color:'silver'}
         ],

         // unitialized states
         cars: [],
         prices: [],
         selectedBrands: []
     };
     this.searchItem = this.searchItem.bind(this); 
     this.sortAscPrice = this.sortAscPrice.bind(this);
     this.sortDescPrice = this.sortDescPrice.bind(this);
     this.priceRanger = this.priceRanger.bind(this);
     this.selectBrand = this.selectBrand.bind(this);
     this.removeBrand = this.removeBrand.bind(this);
    
 }

 componentWillMount() {
     this.setState({
       cars : this.state.data
     });

     //get min and max price
     let carPrices = [];
     this.state.data.map((v) => {
         carPrices.push(v);
     })
     let prices = carPrices.sort((a, b) => a.price - b.price);

     this.setState({
       prices: [prices[0].price, prices[prices.length-1].price]
     });
 }
 componentDidMount() {
    console.log(this.state.prices)
 }
render() {
    return(
        <div className='mainContainer' >
    
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
            
            <div className='space'></div>
            <div className='price-f'>
             Price: 
             <button onClick={this.sortAscPrice} className='price-btn'>ASC Price</button>
             <button onClick={this.sortDescPrice} className='price-btn'>DESC Price</button>

             Between: {this.state.prices[0] || 0} <input onChange={this.priceRanger} type='range' min ={this.state.prices[0]} max={this.state.prices[1]}/> {this.state.maxPrice || 100000} $
            </div>

            <div className='brand'> <div>Brand:</div>  {this.state.data.map(v => <div onClick={this.selectBrand} className='brandName'>{v.make}</div>)}</div>
        <div className='selectedBrands'>{this.state.selectedBrands.map((v, i)=> {
            return <div className='brandItem' key={i}><span>{v}</span><span onClick={this.removeBrand} className='close'>X</span></div>
        })}
        </div>



            </div> 
            

        </div>
    )
}

searchItem(event) {
  let list = this.state.data
  let searched = event.target.value.toLowerCase();
  this.setState({
    searched: searched,
     cars: list.filter((v) => {
         // check for make or model
         if(v.make.toLowerCase().indexOf(searched) !== -1 || v.model.toLowerCase().indexOf(searched) !== -1 ) {
         // check for brands
             if(this.state.selectedBrands.indexOf(v.make) !== -1) {
                 //check for price
                if(v.price <= this.state.maxPrice){
                    return v;
                   }
             }
               else if(this.state.maxPrice === undefined) {
                   return v
            };
         };
     }),
  });
}

sortAscPrice() {
    this.setState({
        cars: this.state.cars.sort((a, b) => a.price - b.price)
    })
}

sortDescPrice() {
    this.setState({
        cars: this.state.cars.sort((a, b) => b.price - a.price)
    })
}

priceRanger(event) {
    let val= event.target.value;
    
    this.setState({
        maxPrice: val,
        cars : this.state.data.filter((v) => {
            console.log(this.state.searched, 'from func')
            if( v.price <= val ) {
                if(this.state.searched !== undefined) {
                    if(v.make.toLowerCase().indexOf(this.state.searched) !== -1 || v.model.toLowerCase().indexOf(this.state.searched) !== -1 ) {
                        return v;
                   }
                } else {
                    return v;
                }
            }
        })
    })

    // setTimeout(this.filterByBrand(), 200);

}

// filter in real time 
componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedBrands > prevState.selectedBrands) {
        this.filterByBrand()
    }
  }

// filter by brands

selectBrand(event) {
    console.log(this.state.selectedBrands, 'initial')
  console.log(event.target.textContent);
  const brand = event.target.textContent;
//   console.log('sb', sB)
  if(this.state.selectedBrands.indexOf(brand) === -1) {
    this.setState({
        selectedBrands: this.state.selectedBrands.concat([brand])
    });
  }
  

  // setTimeout(this.filterByBrand(), 1000);

  console.log(this.state.selectedBrands)
}

filterByBrand(){
    this.setState({
        cars: this.state.data.filter((v) => {
            if(this.state.selectedBrands.indexOf(v.make) !== -1 ) {
                if(v.price <= this.state.maxPrice) {
                    return v;
                   }else if(this.state.maxPrice === undefined) {
                       return v;
                   }
            }
          })
    });
}

removeBrand(event) {
    const brand = (event.target.previousSibling.textContent);
    let currentStates = this.state.selectedBrands;
    currentStates.splice(currentStates.indexOf(brand), 1);
    this.setState({
        selectedBrands: currentStates
    });
   this.filterByBrand();
}



};
module.exports=ListComponent;