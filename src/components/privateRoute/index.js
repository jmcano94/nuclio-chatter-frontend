import {Route, Redirect} from "react-router-dom";
import {getSessionUser} from "../../api/auth";


const PrivateRoute = ({children, ...rest}) => {
	const sessionUser = getSessionUser();
	if(sessionUser){
		return <Route {...rest}>{children}</Route>
	}else{
		return <Redirect to={"/login"}/>
	}
}

export default PrivateRoute;
