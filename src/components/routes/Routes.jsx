import { lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/HomePage'));
const ErrorPage = lazy(() => import('../pages/ErrorPage'));
const AuthPage = lazy(() => import('../account-auth/AuthPage'));
const About = lazy(() => import('../about/About'));

function Routes() {
    return (
        <Switch>

            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={AuthPage} />
            <Route exact path="/about" component={About} />

            <Route exact path='/error' component={ErrorPage} />
            <Redirect to='/error' />

        </Switch>
    )
}

export default Routes;
