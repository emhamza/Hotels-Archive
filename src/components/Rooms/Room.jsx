import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { BsArrowRightCircle } from 'react-icons/bs';
import "./Room.scss";

const Room = ({ room }) => (
    <>
    <Link to={`/room/${room.hotel_id}`}>
            <div className="single-card">
                <div>
                    <img src={room.main_photo_url} alt="Hotel Picture" className="room-img" />
                </div>
                <div className="card-text">
                    <p>
                        {room.hotel_name.slice(0, 19)}
                    </p>
                    <p>
                        {room.hotel_facilities?.split(",").length}
                    </p>
                </div>
                <div className="arrow-icon">
                        <BsArrowRightCircle  />
                </div>
            </div>
    </Link>
    </>
);

Room.propTypes = {
    room: PropTypes.shape({
        hotel_id: PropTypes.number,
        hotel_name: PropTypes.string,
        main_photo_url: PropTypes.string,
        hotel_facilities: PropTypes.string,
        accommodation_type_name: PropTypes.string,
    }).isRequired,
};

export default Room;
