import { BrowserRouter, Route, Switch } from "react-router-dom";

import { AuthContextProvider } from "./contexts/AuthContext";
import { AdminRoom } from "./pages/AdminRoom";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";
import { Home } from "./pages/Home";

export default function App() {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				<Switch>
					<Route path="/admin/rooms/:id" component={AdminRoom} />
					<Route path="/rooms/new" exact component={NewRoom} />
					<Route path="/rooms/:id" component={Room} />
					<Route path="/" exact component={Home} />
				</Switch>
			</AuthContextProvider>
		</BrowserRouter>
	);
}
