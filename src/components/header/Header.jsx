import "./header.css"
import { AiOutlineCar } from "react-icons/ai"
import { IoBedOutline, IoAirplaneOutline, IoBed, IoCalendarOutline, IoPerson } from "react-icons/io5"
import { BiTaxi } from "react-icons/bi"
import { MdOutlineAttractions } from "react-icons/md"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { useState } from "react"
import { format } from "date-fns"
import { useNavigate } from "react-router-dom";

const Header = ({ type }) => {
    const [destination, setDestination] = useState("");
    const [showDate, setShowDate] = useState(false)
    const [date, setDate] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: "selection"
    },
    ])
    const [showOptions, setShowOptions] = useState(false)
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    })

    const navigate = useNavigate();

    const handleOption = (name, operation) => {
        setOptions(prev => {
            return {
                ...prev,
                [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
            }
        })
    }

    const handleSearch = () => {
        navigate("/hotels", { state: { destination, date, options } });
    };

    return (
        <div className="header">
            <div className={type === 'list' ? "headerContainer listMode" : "headerContainer"}>
                <div className="headerList">
                    <div className="headerListItem active" >
                        <IoBedOutline size={25} />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <IoAirplaneOutline size={25} />
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <AiOutlineCar size={25} />
                        <span>Car rentals</span>
                    </div>
                    <div className="headerListItem">
                        <MdOutlineAttractions size={25} />
                        <span>Attractions</span>
                    </div>
                    <div className="headerListItem">
                        <BiTaxi size={25} />
                        <span>Airport Taxis</span>
                    </div>
                </div>

                {type !== 'list' &&
                    <>
                        <h1 className="headerTitle">Find your next stay</h1>
                        <p className="headerDesc">
                        Search deals on hotels, homes, and much more...
                        </p>
                        <button className="headerBtn">Sign in / Register</button>

                        <div className="headerSearch">
                            <div className="headerSearchItem">
                                <IoBed className="headerIcon" />
                                <input type="text" placeholder="Where are you going?" className="headerSearchInput" />
                            </div>

                            <div className="headerSearchItem">
                                <IoCalendarOutline className="headerIcon" />
                                <span onClick={() => setShowDate(!showDate)} className="headerSearchText">{format(date[0].startDate, "dd/MM/yyyy")} to {format(date[0].endDate, "dd/MM/yyyy")}</span>
                                {showDate && <DateRange
                                    editableDateInputs={true}
                                    onChange={(item) => setDate([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={date}
                                    className='date'
                                />}
                            </div>

                            <div className="headerSearchItem">
                                <IoPerson className="headerIcon" />
                                <span onClick={() => setShowOptions(!showOptions)} className="headerSearchText">{options.adult} adult · {options.children} children ·  {options.room} room</span>
                                {showOptions &&
                                    <div className="options">
                                        <div className="optionItem">
                                            <span className="optionText">Adult</span>
                                            <div className="optionCounter">
                                                <button disabled={options.adult <= 1} className="optionCounterButton" onClick={() => handleOption("adult", "d")}>-</button>
                                                <span className="optionCounterNumber">{options.adult}</span>
                                                <button className="optionCounterButton" onClick={() => handleOption("adult", "i")}>+</button>
                                            </div>
                                        </div>
                                        <div className="optionItem">
                                            <span className="optionText">Children</span>
                                            <div className="optionCounter">
                                                <button disabled={options.children <= 0} className="optionCounterButton" onClick={() => handleOption("children", "d")} >-</button>
                                                <span className="optionCounterNumber">{options.children}</span>
                                                <button className="optionCounterButton" onClick={() => handleOption("children", "i")} >+</button>
                                            </div>
                                        </div>
                                        <div className="optionItem">
                                            <span className="optionText">Room</span>
                                            <div className="optionCounter">
                                                <button disabled={options.room <= 1} className="optionCounterButton" onClick={() => handleOption("room", "d")}>-</button>
                                                <span className="optionCounterNumber">{options.room}</span>
                                                <button
                                                    className="optionCounterButton" onClick={() => handleOption("room", "i")} >+</button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>

                            <div className="headerSearchItem">
                                <button className="headerBtn" onClick={handleSearch} >Search</button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Header