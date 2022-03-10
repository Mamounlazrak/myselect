import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import RestaurantsListPage from './Pages/RestaurantsListPage/RestaurantsListPage';
import SignupPage from './Pages/SignupPage/SignupPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import RestaurantDetailsPage from './Pages/RestaurantDetailsPage/RestaurantDetailsPage';
import MyRestaurantsListPage from './Pages/MyRestaurantsListPage/MyRestaurantsListPage';



function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignupPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/restaurants" element={<RestaurantsListPage />}/>
        <Route path="/myrestaurants" element={<MyRestaurantsListPage />}></Route>
        <Route path="/restaurants/:restaurantId" element={<RestaurantDetailsPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
