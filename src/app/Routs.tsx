import { Layout } from "@shared/lib/kit/components";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../pages/home-page/HomePage";
import { PhotoDetailPage } from "../pages/photo-detail-page/PhotoDetailPage";
import { BASE_PATH } from "@shared/utils/constants";
import { SearchResultsPage } from "../pages/search-result-page/SearchResultsPage";
import { FavoritesPage } from "../pages/favorites-page/FavoritesPage";
import { AppHeader } from "@shared/lib/kit/app-header/AppHeader";

const { Content } = Layout;

const App: React.FC = () => {
	return (
		<Router>
			<Layout style={{ minHeight: "100vh" }}>
				<AppHeader />
				<Content>
					<Routes>
						<Route path="/" element={<Navigate to={`/${BASE_PATH}/`} replace />} />
						<Route path={`/${BASE_PATH}/`} element={<HomePage />} />
						<Route path={`/${BASE_PATH}/search`} element={<SearchResultsPage />} />
						<Route path={`/${BASE_PATH}/photos/:id`} element={<PhotoDetailPage />} />
						<Route path={`/${BASE_PATH}/favorites`} element={<FavoritesPage />} />
					</Routes>
				</Content>
			</Layout>
		</Router>
	);
};

export default App;
