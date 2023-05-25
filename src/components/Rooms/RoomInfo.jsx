import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchDetails } from "../../redux/booking/roomSlice"
import { BsFillGearFill } from "react-icons/bs";
import { FaChevronLeft, FaMicrophone, FaStar, FaThumbsUp   } from 'react-icons/fa';
import "./Room.scss";



const RoomInfo = () => {
    const { searchId, roomDetails, detailLoading} = useSelector((store) => store.room);

    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(fetchDetails({ hotel_id: params.id, searchId}));
    }, [dispatch, params.id, searchId]);

    const renderInfo = () => (
        <ul>
            {roomDetails.rooms.photos.map((photo, i) => {
                if(i > 0) {
                    return(
                        <li key={photo?.url_original}>
                            <img src={photo?.url_original} alt="room-photo" />
                            <div>
                                <p>{roomDetails.rooms.facilities[i]?.name}</p>
                                <p>{roomDetails.rooms.highlights[i]?.translated_name}</p>
                                <div className="thumb">
                                    <FaThumbsUp  />
                                    <p>{Number(Math.random() * (300 - 1) + 1).toFixed(0)}</p>
                                </div>
                            </div>
                        </li>
                    );
                }
                return <li key={photo?.url_original} />
            })}
        </ul>
    );

    if (detailLoading) return <div data-testid="loading-message">Room details are loading ...</div>

  return (
    <div>
        <ul className="info-navbar">
            <li>
                <Link to="/" className="back">
                    <p className="back-icon">
                     <FaChevronLeft />
                    </p>
                    <p>Back to Home</p>
                </Link>
            </li>
            <li className="h-name">{roomDetails.hotel_name.split(' ')[0]}</li>
            <li className="nav-icons">
             <FaMicrophone />
             <BsFillGearFill />
            </li>
        </ul>
        <div>
            <div>
                <div
                    className="background-image"
                >
                    <div className="main-bg">
                        <div className="disc-1">
                        <p>Distance to city:</p>
                        <p>{`${roomDetails.distance_to_cc.toFixed(2)} km,`}</p>
                        <p>Price per night:</p>
                        <p>
                            {`${roomDetails.composite_price_breakdown.net_amount.value.toFixed(2)} ${roomDetails.composite_price_breakdown.net_amount.currency}`}
                        </p>
                        </div>
                        <div className="disc-2">
                        <p>Country:</p>
                        <p>{roomDetails.country_trans},</p>
                        <p>Area in Square Meters:</p>
                        <p>{`${roomDetails.average_room_size_for_ufi_m2} sqm`}</p>
                        </div>
                        <div className="disc-3">
                        <p>{`Rating${roomDetails.breakfast_review_score?.review_score} / 10`}</p>
                        <p>
                            <FaStar />
                        </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            {roomDetails.hotel_name}
        </div>
        <div className="disc-4">
            <div>
                {renderInfo()}  
            </div>
        </div>
    </div>
  );
};

export default RoomInfo;
