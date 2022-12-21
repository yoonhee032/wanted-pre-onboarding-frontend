import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TestTodo from "./pages/todo/TodoList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<TestTodo />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
