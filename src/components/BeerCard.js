import React, { useState } from 'react'
import './BeerCard.css'

const BeerCard = ({ beer }) => {
    const [learnToggle, setToggle] = useState(false)
    const [heightToggle, setHeightToggle] = useState(false)

    const isLearnToggle = () => {
        setToggle(!learnToggle)
        setHeightToggle(!heightToggle)
    }

    const coordsToString = (coords) => {
        if (coords != undefined){
            let coordString = coords.toString(',')
            return coordString
        }else{
            return 'no data'
        }
        
    }

    function handleEmptyEntry(entry) {
        if (entry == undefined) {
            return 'No data'
        }
        else if(entry != undefined){
            return entry
        }
    }

    return (

        <div className="card-container">
            <div className="full-card-beer" ></div>
            <div className="main-card">
                <div className="name">
                    <h4 className='card-beer-name'>{beer.name}</h4>
                </div>
                <div className="category-country">
                    <div className='card-beer-origin'>{beer.category} from {beer.country}</div>
                </div>
                <div className="abv-ibu">
                    <div className="abv">
                        <div className='card-beer-abv'>ABV:<br /><span>{handleEmptyEntry(beer.abv).toFixed(1) + '%'}</span></div>
                    </div>
                    <div className="ibu">
                        <div className='card-beer-ibu'>IBU:<br /><span>{handleEmptyEntry(beer.ibu)}</span></div>
                    </div>
                </div>
            </div>
            {/* <div className="btn">
                {<button type="button" className='card-button' onClick={isLearnToggle}>
                    {learnToggle ? '<' : '>'}
                </button>}
            </div> */}
            {/* {learnToggle && ( */}
                <div className="more-info">
                    <div className="description">
                        <div className='card-beer-description'>{handleEmptyEntry(beer.description)}</div>
                    </div>
                    <div className="location-info">
                        <div className="city-state">
                            <div className='card-beer-adress'>Brewery's Address:<br />{handleEmptyEntry(beer.address)}, {handleEmptyEntry(beer.city)}, {handleEmptyEntry(beer.state)}</div>
                        </div>
                        <div className="gps-coords">
                            <div className='card-beer-gpscoords'>GPS coordinates:<br /><a href={'http://maps.google.com?q=' + coordsToString(beer.coordinates)}>See on Maps</a></div>
                        </div>
                        <div className="website-link">
                            <div className='card-beer-website'>Brewery's website:<br /><a href={beer.website}>{handleEmptyEntry(beer.website)}</a></div>
                        </div>
                    </div>
                </div>
            {/* )} */}
        </div>
    )
}

export default BeerCard






       // <section className='cards'>
        //     <div className='card-beer' style={learnToggle ? { "width": "700px" } : { "width": "300px" }}> ;
        //         <h4 className='card-beer-name'>{beer.name}</h4> ;
        //         <div className='card-beer-origin'>{beer.category} from {beer.country}</div> ;
        //         <div className='card-beer-abv'>ABV:<br/><span>{beer.abv.toFixed(1) + '%'}</span></div>
        //         <div className='card-beer-ibu'>IBU:<br/><span>{beer.ibu}</span></div>
        //         {<button type="button" className='card-button' onClick={isLearnToggle}>
        //             {learnToggle ? 'show less' : 'click to learn more'}
        //         </button>}
        //         {learnToggle && (
        //             <div className='card-beer-show-more'>
        //                 <div className='card-beer-description'>{beer.description}</div>
        //                 <div className='card-beer-adress'>Brewery's Address:<br/>{beer.address}, {beer.state}</div>
        //                 <div className='card-beer-gpscoords'>GPS coordinates:<br/><a href={'http://maps.google.com?q=' + coordsToString(beer.coordinates)}>click here to see on Maps</a></div>
        //                 <div className='card-beer-website'>Brewery's website:<br/><a href={beer.website}>{beer.website}</a></div>

        //             </div>
        //         )}
        //     </div>
        // </section>