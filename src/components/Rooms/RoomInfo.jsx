import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchDetails } from "../../redux/booking/roomSlice"
import { SlLike, BsFillGearFill } from "react-icons/bs";
import { FaChevronLeft, FaMicrophone } from 'react-icons/fa';


const RoomInfo = () => {
    const { searchId, roomDetials, detailLoading} = useSelector((store) => store.room);

    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(fetchDetails({ hotel_id: params.id, searchId}));
    }, [dispatch]);

    const renderInfo = () => (
        <ul>
            {roomDetials.rooms.photos.map((photo, i) => {
                if(i > 0) {
                    return(
                        <li key={photo?.url_original}>
                            <img src={photo?.url_original} alt="room-photo" />
                            <div>
                                <p>{roomDetials.rooms.facilities[i]?.name}</p>
                                <p>{roomDetials.rooms.highlights[i]?.translated_name}</p>
                                <div>
                                    <SlLike />
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

    if (detailLoading) return <p>Room details are loading ...</p>
  return (
    <div>
        <ul>
            <li>
                <Link to="/">
                    <p>
                     <FaChevronLeft />
                    </p>
                    <p>Back to Home</p>
                </Link>
            </li>
            <li>{roomDetials.hotel_name.split(' ')[0]}</li>
            <li>
             <FaMicrophone />
             <BsFillGearFill />
            </li>
        </ul>
        <div>
            <div>
                <div>
                    <p>
                        {`${roomDetials.distance_to_cc.toFixed(2)} km`}
                    </p>
                    <p>Distance to city</p>
                    <p>
                        {`${roomDetials.composite_price_breakdown.net_amount.value.toFixed(
                            2,
                        )} ${roomDetials.composite_price_breakdown.net_amount.currency}`}
                    </p>
                    <p>Price per night</p>
                </div>
                <div>
                    <p>
                        {roomDetials.country_trans}
                    </p>
                    <p>{`${roomDetials.average_room_size_for_ufi_m2}`}</p>
                    <p>Squre Meter</p>
                </div>
                <p>{`Rating${roomDetials.breakfast_review_score?.review_score} / 10`}</p>
            </div>
            <img src={roomDetials.rooms.photo[0]?.url_original} alt="hotal-room" />
        </div>
        <div>{roomDetials.hotel_name}</div>
        {renderInfo()}    
    </div>
  );
};

export default RoomInfo;
