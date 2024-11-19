import "./App.css";
import Header from "./components/common/header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./components/about/About";
import CourseHome from "./components/allcourses/CourseHome";
import Team from "./components/team/Team";
import Pricing from "./components/pricing/Pricing";
import Blog from "./components/blog/Blog";
import Contact from "./components/contact/Contact";
import Footer from "./components/common/footer/Footer";
import Home from "./components/home/Home";
import Hero from "./components/home/hero/Hero";
import FearFreeForm from "./components/pricing/FearFreeForm";
import CongratulationsPage from "./components/congratulations/CongratulationsPage";
import CategoriesPage from "./components/game/CategoriesPage/CategoriesPage";
import SubcategoryPage from "./components/game/SubcategoryPage/SubcategoryPage";
import LevelsPage from "./components/game/LevelsPage/LevelsPage";
import GameLevelPage from "./components/game/GameLevelPage/GameLevelPage";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import CategoriesPagedoc from "./components/game/CategoriesPage/CategoriesPagedoc";
import SubcategoryPagedoc from "./components/game/SubcategoryPage/SubcategoryPagedoc";
import LevelsPagedoc from "./components/game/LevelsPage/LevelsPagedoc";
import GameLevelPagedoc from "./components/game/GameLevelPage/GameLevelPagedoc";
import Registerdoc from "./components/Login/Registerdoc";
import coins from "./components/coins/coins";
import AnimalModelViewer from "./AnimalModelViewer";
import Profile from "./components/Login/profile";
function App() {
  return (
    <>

      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/courses' component={CourseHome} />
          <Route exact path='/team' component={Team} />
          <Route exact path='/pricing' component={Pricing} />
          <Route exact path='/journal' component={Blog} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/fearfreeform' component={FearFreeForm} />
          <Route exact path='/categories' component={CategoriesPage} />

          <Route exact path='/subcategory/:id' component={SubcategoryPage} />
          <Route exact path="/levels/:subcategoryId/:animal" component={LevelsPage} />
          {/* <Route exact path='/gamelevel/:levelId' component={GameLevelPage} /> */}
          <Route exact path='/category/:category/:animal/level/:level' component={GameLevelPage} />
          <Route exact path="/congratulations" component={CongratulationsPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />

          <Route exact path="/registerdoc" component={Registerdoc} />
          <Route exact path='/categoriesdoc' component={CategoriesPagedoc} />
          <Route exact path='/subcategory/:id/doc' component={SubcategoryPagedoc} />
          <Route exact path="/levels/:subcategoryId/:animal/doc" component={LevelsPagedoc} />
          <Route exact path='/category/:category/:animal/level/:level/doc' component={GameLevelPagedoc} />
          <Route exact path="/subcategory/coins" component={coins} />
          <Route exact path="/profile" component={Profile} />

        </Switch>
        <Footer />
      </Router>

    </>
  );
}

export default App;
