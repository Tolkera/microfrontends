import React, {lazy, Suspense, useState, useEffect } from "react";
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Progress from "./components/Progress";
import {StylesProvider, createGenerateClassName} from '@material-ui/core/styles';
const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})
import {createBrowserHistory} from 'history';
const MarketingLazy = lazy(()=>{
    return import('./components/MarketingApp')
})
const AuthLazy = lazy(()=>{
    return import('./components/AuthApp')
})
const DashboardLazy = lazy(()=>{
    return import('./components/DashboardApp')
})
const history = createBrowserHistory();
export default() => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    useEffect(()=>{
       if(isSignedIn){
           history.push('/dashboard');
       }
    }, [isSignedIn])
    return(
    <Router history={history}>
        <StylesProvider generateClassName={generateClassName}>
        <div>
            <Header isSignedIn={isSignedIn} onSignOut={()=>{setIsSignedIn(false)}}/>
            <Suspense fallback={<Progress />}>
                <Switch>
                    <Route path="/auth" component={AuthLazy}>
                        <AuthLazy onSignin = {()=>{setIsSignedIn(true)}} />
                    </Route>
                    <Route path="/dashboard">
                        {!isSignedIn && <Redirect to='/' />}
                        <DashboardLazy />
                    </Route>
                    <Route path="/" component={MarketingLazy}></Route>
                </Switch>
            </Suspense>

        </div>
        </StylesProvider>
    </Router>
    )
}