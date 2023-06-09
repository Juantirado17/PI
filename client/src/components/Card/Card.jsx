import style from "./Card.module.css"; 
import { Link } from 'react-router-dom';



const Card = (props) => {
    return(
        <div className={style.container}>
           <img className={style.img} src={props.image} alt={props.name} />
            <h2 className={style.name}>{props.name}</h2>
            <p className={style.temperaments}>{props.temperaments}</p>
            <p className={style.weightProps}>{props.min_weight} - {props.max_weight} kg</p>
            {props.id === "no-info" ? (
                <><p>No details</p></>) :
                <Link to={`/home/${props.id}`}>
                    <p className={style.enlace}>Details</p>
                </Link>}
        </div>
    )

}

export default Card;