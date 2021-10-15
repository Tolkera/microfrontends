import React, {useRef, useEffect } from "react";
import {mount} from 'auth/Auth';
import { useHistory } from 'react-router-dom'
export default ({onSignin}) => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            onSignin,
            initialPath: history.location.pathname,
            //destructuring and renaming the argument
            onNavigate: ({pathname : nextPathName})=>{
                const { pathname } = history.location;
                if (pathname !== nextPathName){
                    history.push(nextPathName);
                }
            }
        })
        history.listen(onParentNavigate)
    }, [])

    return <div ref={ref} />
}
