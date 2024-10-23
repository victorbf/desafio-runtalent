import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import ClientList from './pages/ClientList';
import CreateClient from './pages/CreateClient';
import EditClient from './pages/EditClient';

const MainRoutes: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Navigate to='/clients' />} />
				<Route path='/clients' element={<ClientList />} />
				<Route path='/clients/new' element={<CreateClient />} />
				<Route path='/clients/edit/:id' element={<EditClient />} />
				<Route path='*' element={<p>404 - Página não encontrada</p>} />
			</Routes>
		</Router>
	);
};

export default MainRoutes;
