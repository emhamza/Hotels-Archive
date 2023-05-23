import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Room from "../src/components/Rooms/Room"
import './App.css';
import { fetchRooms } from "./redux/booking/roomSlice";
import png from "./assets/Roosevelt_Hotel.jpg";
import { FaMicrophone } from 'react-icons/fa';
import { BsFillGearFill } from 'react-icons/bs';

function App() {
  const [list, setList] = useState('');
  const { rooms, isLoading, error} = useSelector((store) => store.room);
  const dispatch = useDispatch();
  const categories = [];

  useEffect(() => {
    if(rooms?.length === 0) {
      dispatch(fetchRooms());
    }
  }, [dispatch]);

  if (isLoading) return <p>Content is Loading</p>;

  if (error) {
    return (
      <div>
        Error Loading 
        {JSON.stringify(error, null, 2)}
      </div>
    );
  }

  const shortListedRooms = 
    list !== ''
      ? rooms.filter((room) => room.accommodation_type_name === list)
      : rooms;

      console.log(shortListedRooms);

  return (
    <>
      <ul className="navbar"> 
        <li>Chose Your Place</li>
        <li>Hotels Archives</li>
        <li>
          <FaMicrophone />
          <BsFillGearFill />
        </li>
      </ul>
      <div className="cover-container">
        <img src={png} alt="hotel-pic" className="cover-img"/>
        <p>
          Book your favourite Hotels
        </p>
      </div>
      <div className="catergory-sel">
        {rooms && rooms.length > 0 && rooms.forEach((rm) => {
          if (!categories.includes(rm.accommodation_type_name)) {
            categories.push(rm.accommodation_type_name);
          }
        })}
        <p>Choose Hotel by Category</p>
        <select value={list} onChange={(e) => { setList(e.target.value)}}>
          <option>All</option>
          {categories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="room-card">
        {shortListedRooms.map((room) =>(
          <div key={room.hotel_id}>
            <Room room={room}/>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
