import React from "react";

import './NotFound.css';
import Center from "../Center/Center";

const NotFound: React.FC = () => {
    return (
        <Center classname="bgGray">
            <div className="notFoundWrap">
                <div className="pageContents">
                    <h1 className="title">Page Not Found !</h1>
                    <span className="pageError">404</span>
                </div>
            </div>
        </Center>
    )
}

export default NotFound;