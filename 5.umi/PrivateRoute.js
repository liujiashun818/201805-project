import { Route, Redirect } from 'react-router-dom';

export default (args) => {
    const { render, ...rest } = args;
    return <Route
        {...rest}
        render={props => localStorage.getItem('login') ? render(props) : <Redirect to="/" />
        }
    />;
}