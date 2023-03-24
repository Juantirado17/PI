import {
    GET_DOGS,
    GET_DOGS_ID_RAZA,
    GET_ALL_DOGS_NAME,
    GET_TEMPERAMENTS,
    SORT_FILTER_A_Z,
    TEMPERAMENT_FILTER,
    API_DB_FILTER,
    RESET_FILTER,
    RESET_DOG,
    RESET_LOADING,
    RESET_DOGS,
    SORT_FILTER_WEIGHT
} from './actions';


const initialState = {
    dogs: [],
    dog: [],
    temperaments: [],
    requesting: false,
    filter: false

}

const rootReducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_DOGS:
            console.log(action.payload);
            return { ...state, dogs: action.payload, filter: true, requesting: true }
        case  GET_DOGS_ID_RAZA:
            return { ...state, dog: action.payload, requesting: true }  
        case  GET_ALL_DOGS_NAME:
            return { ...state, dogs: action.payload, filter: true, requesting: true }   
        case  GET_TEMPERAMENTS:
            return { ...state, dogs: action.payload, filter: true }   
        case SORT_FILTER_A_Z:
            return { ...state, dogs: action.payload, filter: true, loading: true }
        case TEMPERAMENT_FILTER:
            return { ...state, dogs: action.payload, filter: true }
        case API_DB_FILTER:
            return { ...state, dogs: action.payload, filter: true }
        case SORT_FILTER_WEIGHT:
            return { ...state, dogs: action.payload, filter: true }
        case RESET_FILTER:
            return { ...state, filter: false }
        case RESET_DOG:
            return { ...state, dog: [] }
        case RESET_DOGS:
            return { ...state, dogs: [] }
        case RESET_LOADING:
            return { ...state, loading: false }   

          default:
            return { ...state};
    }

}

export default rootReducer;