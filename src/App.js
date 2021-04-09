import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./views/login";
import Signup from "./views/signup";
import Chatter from "./views/chatter";
import PrivateRoute from "./components/privateRoute";
import {ChakraProvider} from "@chakra-ui/react";
import theme from "./assets/theme";
import {ChatContextProvider} from "./context";

function App() {
  return (
  	<ChakraProvider theme={theme}>
			<ChatContextProvider>
				<BrowserRouter>
					<Switch>
						<Route exact path="/login">
							<Login/>
						</Route>
						<Route exact path="/signup">
							<Signup/>
						</Route>
						<PrivateRoute path={"/"}>
							<Chatter/>
						</PrivateRoute>
					</Switch>
				</BrowserRouter>
			</ChatContextProvider>
		</ChakraProvider>


  );
}

export default App;
