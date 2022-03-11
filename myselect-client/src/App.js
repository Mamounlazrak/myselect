import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import RestaurantsListPage from './Pages/RestaurantsListPage/RestaurantsListPage';
import SignupPage from './Pages/SignupPage/SignupPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import RestaurantDetailsPage from './Pages/RestaurantDetailsPage/RestaurantDetailsPage';
import MyRestaurantsListPage from './Pages/MyRestaurantsListPage/MyRestaurantsListPage';
import IsPrivate from './Components/IsPrivate/IsPrivate';
import IsAnon from './Components/IsAnon/IsAnon';
import RestaurantEditPage from './Pages/RestaurantEditPage/RestaurantEditPage';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>}/>
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>}/>
        <Route path="/restaurants" element={<RestaurantsListPage />}/>
        <Route path="/myrestaurants" element={<IsPrivate> <MyRestaurantsListPage /> </IsPrivate>} /> 
        <Route path="/restaurants/:restaurantId" element={<RestaurantDetailsPage />}></Route>
        <Route path="/edit/:restaurantId" element={<RestaurantEditPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
