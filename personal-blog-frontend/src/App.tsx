import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import FeedPage from "./pages/FeedPage/FeedPage";
import PostPage from "./pages/PostPage/PostPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/" element={<FeedPage />} />
          <Route path="/post/:id" element={<h1>Detalhes da publicação</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<h1>Cadastro</h1>} />

          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<h1>Administração</h1>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
