import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProductCreateScreen from "./screens/ProductCreateScreen";
import ProfileProductScreen from "./screens/ProfileProductScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" exact component={ProfileScreen} />
          <Route path="/profile/product/:id" component={ProfileProductScreen} />
          <Route path="/product/:id" exact component={ProductScreen} />
          <Route
            path="/product/create"
            strict
            component={ProductCreateScreen}
          />
          <Route path="/product/detail/:id" component={ProductScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
