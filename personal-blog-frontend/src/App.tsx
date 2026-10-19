import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import FeedPage from "./pages/FeedPage/FeedPage";
import PostPage from "./pages/PostPage/PostPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/" element={<FeedPage />} />
          <Route path="/posts/:id" element={<h1>Detalhes da publicação</h1>} />
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="/register" element={<h1>Cadastro</h1>} />
          <Route path="/admin" element={<h1>Administração</h1>} />
        </Route>

        <Route path="/admin" element={<h1>Adinistração</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
