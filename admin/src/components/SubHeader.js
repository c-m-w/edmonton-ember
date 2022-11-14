/// SubHeader.js

import {useNavigate} from "react-router-dom";

export default function SubHeader(props) {

    const navigate = useNavigate();

    return (
        <div className="sub-header">
            {props.showReturnArrow 
                && <img 
                        src={"/assets/icons/arrow-left-light.svg"} 
                        className="go-back icon"
                        onClick={() => {navigate(-1);}} />}
            <h2>{props.title}</h2>
        </div>
    )
}