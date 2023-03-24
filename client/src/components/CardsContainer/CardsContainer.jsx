import Card from "../Card/Card"
import style from "./CardsContainer.module.css"
import { useSelector } from "react-redux";
import React from "react"



const CardsContainer = ({dogs}) => {
   
    const requesting = useSelector(state=> state.requesting)
    
    return(
        <div className={style.container}>
           {requesting ? (<>
                {dogs.length > 0 ? (
                    <>
            {dogs.map(dog => {
                return <Card 
                key={dog.id}
                id={dog.id}
                name={dog.name}
                image={dog.image}
                min_weight={dog.min_weight}
                max_weight={dog.max_weight}
                temperaments={dog.temperaments}

                 />
            })}
            </>
                ) : (<>
                    <Card
                        key="no-info"
                        id="no-info"
                        name="The sought breed does not exist"
                        image="https://stormgain.com/sites/default/files/news/DOGE%20breed.jpg"
                        min_weight="0"
                        max_weight="0"
                        temperaments="There is no information"
                    />
                </>)}
            </>) : (<>
                <img src="/loading.gif" alt="loading img"></img>
            </>)}
        </div>
    )

}

export default CardsContainer;