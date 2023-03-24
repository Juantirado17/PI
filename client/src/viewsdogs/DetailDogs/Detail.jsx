import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogsIdRaza, resetLoading } from "../../redux/actions";
import CardById from "../../components/CardById/CardById";

const DetailDog = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const loading = useSelector(state => state.loading);
    useEffect(() => {
        dispatch(getDogsIdRaza(id));
       dispatch(resetLoading());
    }, [dispatch, id]);

    return (
        <div>
            <CardById loading={loading} />
        </div>
    )
}

export default DetailDog;