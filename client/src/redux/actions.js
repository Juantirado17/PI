import axios from "axios";
export const GET_DOGS = "GET_DOGS";
export const GET_DOGS_ID_RAZA = "GET_DOGS_ID_RAZA";
export const GET_ALL_DOGS_NAME = "GET_ALL_DOGS_NAME";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const SORT_FILTER_A_Z = "SORT_FILTER_A_Z";
export const TEMPERAMENT_FILTER = "TEMPERAMENT_FILTER";
export const API_DB_FILTER = "API_DB_FILTER";
export const RESET_FILTER = "RESET_FILTER";
export const RESET_DOG  = "RESET_DOG";
export const RESET_LOADING = "RESET_LOADING";
export const RESET_DOGS = "RESET_DOGS";
export const SORT_FILTER_WEIGHT = "SORT_FILTER_WEIGHT";



export const getDogs = () => {
    
    return async function (dispatch) {
        const dogs = await axios.get('http://localhost:3001/dogs');
        console.log(dogs.data);
        dispatch({ type: GET_DOGS, payload: dogs.data })
    }
};

export const getDogsIdRaza = (id) => async (dispatch) => {
    try {
        const dogsIdRaza = await axios.get(`http://localhost:3001/dogs/${id}`);
        return dispatch({ type: GET_DOGS_ID_RAZA, payload: dogsIdRaza.data });
    } catch (error) {
        const dogsIdNoSearch = []
        return dispatch({ type: GET_DOGS_ID_RAZA, payload: dogsIdNoSearch })
    }

};

export const getAllDogsName = (name) => async (dispatch) => {
    try {
        const allDogsName = await axios.get(`http://localhost:3001/dogs?name=${name}`);
        return dispatch({ type: GET_ALL_DOGS_NAME, payload: allDogsName.data });
    } catch (error) {
        const dogsNameNoSearch = []
        return dispatch({ type: GET_ALL_DOGS_NAME, payload: dogsNameNoSearch })
    }
}

export const getTemperaments = () => async (dispatch) => {
    try {
        const allTemperaments = await axios.get('http://localhost:3001/temperaments')
        const temperamentsSorted = allTemperaments.data.sort((a, b) => a.name.localeCompare(b.name));
        return dispatch({ type: GET_TEMPERAMENTS, payload: temperamentsSorted });
    } catch (error) {
        throw new Error(error);
    }
};



export const sortFilterAZ = (dogs, value) => {
    try {
        let dogsSorted = []
        if (value === "ASC") {
            dogsSorted = dogs.sort((a, b) => a.name.localeCompare(b.name))
        }
        if (value === "DESC") {
            dogsSorted = dogs.sort((a, b) => b.name.localeCompare(a.name))
        }
        return function (dispatch) {
            dispatch({ type: SORT_FILTER_A_Z, payload: dogsSorted })
        }
    } catch (error) {
        throw new Error(error);
    }
}

export const temperamentFilter = (dogs, value) => {
    try {
        let dogFilter = []
        dogs.forEach(dog => {
            const dogTemp = [];
            if (dog.temperaments) dogTemp.push(...dog.temperaments.split(", "));
            if (dogTemp.includes(value)) dogFilter.push(dog);
        });
        return function (dispatch) {
            dispatch({ type: TEMPERAMENT_FILTER, payload: dogFilter })
        }
    } catch (error) {
        throw new Error(error);
    }
}

export const apiDbFilter = (dogs, value) => {
    try {
        let dogFilter = []
        dogs.forEach(dog => {
            if (dog.from === value) dogFilter.push(dog);
        });
        return function (dispatch) {
            dispatch({ type: API_DB_FILTER, payload: dogFilter });
        }
    } catch (error) {
        throw new Error(error);
    }
}

export const sortFilterLH = (dogs, value) => {
    try {
        let dogsSorted = []
        if (value === "high-low") {
            dogsSorted = dogs.sort(
                (a, b) =>
                    (a.minWeight < b.minWeight) ? 1 : (a.minWeight > b.minWeight) ? -1 : 0);
        }
        if (value === "low-high") {
            dogsSorted = dogs.sort(
                (a, b) =>
                    (a.minWeight > b.minWeight) ? 1 : (a.minWeight < b.minWeight) ? -1 : 0);
        }
        return function (dispatch) {
            dispatch({ type: SORT_FILTER_WEIGHT, payload: dogsSorted })
        }
    } catch (error) {
        throw new Error(error);
    }
}

export const resetFilter = () => {
    return function (dispatch) {
        dispatch({ type: RESET_FILTER })
    }
}

export const resetDog = () => {
    return function (dispatch) {
        dispatch({ type: RESET_DOG })
    }
}

export const resetLoading = () => {
    return function (dispatch) {
        dispatch({ type: RESET_LOADING })
    }
}

export const resetDogs = () => {
    return function (dispatch) {
        dispatch({ type: RESET_DOGS })
    }
}
