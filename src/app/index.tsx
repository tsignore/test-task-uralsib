import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>HomePage</div>} />
        <Route path="post/:id" element={<div>PostPage</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
