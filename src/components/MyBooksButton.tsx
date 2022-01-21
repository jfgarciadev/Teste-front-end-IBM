
import { useNavigate } from "react-router-dom";

function MyBooksButton(props: any) {

    const navigate = useNavigate()

    return (
        <div className='myBooksButton'
            onClick={() => {
                navigate({
                    pathname: '/mybooks',
                })            
            }}
        >
         MyBooks   
        </div>
    );
}

export default MyBooksButton;


