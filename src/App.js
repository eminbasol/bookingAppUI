import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from './screens/Home/HomeScreen'
import HotelListScreen from './screens/HotelList/HotelListScreen'
import HotelScreen from "./screens/Hotel/HotelScreen";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/hotels' element={<HotelListScreen />} />
        <Route path='/hotels/:id' element={<HotelScreen />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
