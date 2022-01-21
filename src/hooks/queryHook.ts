import {useLocation} from "react-router-dom";

const useQuery = (queryName: any) => {
    const location = useLocation().search;
    return new URLSearchParams(location).get(queryName);
}


export default useQuery;