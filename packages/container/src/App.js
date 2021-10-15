import React, {lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Progress from "./components/Progress";
import {StylesProvider, createGenerateClassName} from '@material-ui/core/styles';
const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})
const MarketingLazy = lazy(()=>{
    return import('./components/MarketingApp')
})
const AuthLazy = lazy(()=>{
    return import('./components/AuthApp')
})

export default() => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    return(
    <BrowserRouter>
        <StylesProvider generateClassName={generateClassName}>
        <div>
            <Header isSignedIn={isSignedIn} onSignOut={()=>{setIsSignedIn(false)}}/>
            <Suspense fallback={<Progress />}>
                <Switch>
                    <Route path="/auth" component={AuthLazy}>
                        <AuthLazy onSignin = {()=>{setIsSignedIn(true)}} />
                    </Route>
                    <Route path="/" component={MarketingLazy}></Route>
                </Switch>
            </Suspense>

        </div>
        </StylesProvider>
    </BrowserRouter>
    )
}