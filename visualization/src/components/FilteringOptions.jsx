import React, { useState } from 'react';
import { Icon, Button, Popup } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRoad, faWind, faCloud, faIcicles, faOilCan, faCity, faHouse, faLocationDot, faWater, faCloudRain, faSnowflake, faWaterLadder, faHandHoldingWater, faTrash } from '@fortawesome/free-solid-svg-icons'
import CorrelationButton from './CorrelationButton';
import axios from 'axios';
import Legend from './Legend';

export const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    return {
        value,
        setValue,
        bind: {
            value,
            onChange: event => {
                setValue(event.target.value);
            }
        }
    };
};


export default function FilteringOptions(props) {

	const { value: startDate, bind: bindStartDate } = useInput("2015-02-02");
	const { value: endDate, bind: bindEndDate } = useInput("2015-02-04");

	const [ selected, setSelected ] = useState([]);
	const [ corr, setCorr ] = useState(0);

	const handleSelection = async (state, column) => {
		if (Object.values(state).reduce((acc, curr) => curr || acc)) {
			const index = selected.indexOf(column);
			if (index < 0) {
				selected.push(column)
				setSelected(selected)
				
				let res = await axios.post("http://localhost:4242/correlation", { "columns": selected })
				setCorr(res.data.correlation);
			}
		} else {
			const index = selected.indexOf(column);
			if (index > -1) {
				selected.splice(index, 1);
				setSelected(selected);

				let res = await axios.post("http://localhost:4242/correlation", { columns: selected })
				setCorr(res.data.correlation);
			}
		}
	}

	const [ state, setState ] = useState({
		"detail" : 4,
        "light_conditions" : [],				// ( 1 | 4 | 5 | 6 | 7 | -1 (missing)),
        "weather_conditions": [],				// ( 1 to 8 | 9 (unknown) | -1 (missing)), 
        "road_surface_conditions": [], 		// ( 1 to 7 | 9 (unkown) | -1 (missing)),
        "urban_or_rural_area" : [], 			// ( 1 | 2 | 3 | -1 (missing)),
        "day_of_week" : [], 					// ( 1 - Sunday to 7 - Saturday),
        "date" : {
            "start" : "2015-02-02", // some date, (optional)
            "end" :  "2015-02-04" // some date,   (optional)
        }
    });

	const [ internal, setInternal ] = useState({
		// ( 1 | 4 | 5 | 6 | 7 | -1 ),
		light_conditions: {
			'1' : false,
			'4' : false,
			'5' : false,
			'6' : false,
			'7' : false,
			'-1': false
		},
		// ( 1 to 8 | 9 (unknown) | -1 (missing))
		weather_conditions: {
			'1' : false,
			'2' : false,
			'3' : false,
			'4' : false,
			'5' : false,
			'6' : false,
			'7' : false,
			'8' : false,
			'9' : false,
			'-1': false
		},
		road_surface_conditions: {
			'1' : false,
			'2' : false,
			'3' : false,
			'4' : false,
			'5' : false,
			'6' : false,
			'7' : false,
			'9' : false,
			'-1': false
		},
		// ( 1 | 2 | 3 | -1 (missing)),
		urban_or_rural_area : {
			'1' : false,
			'2' : false,
			'3' : false,
			'-1' : false,
		},
		// ( 1 - Sunday to 7 - Saturday),
		day_of_week: {
			'1' : false,
			'2' : false,
			'3' : false,
			'4' : false,
			'5' : false,
			'6' : false,
			'7' : false
		}
	})

	const handleLight = (num) => {
		return () => {
			let internalState = {
				...internal,
				light_conditions: { ...internal.light_conditions, [num] : !internal.light_conditions[num] }
			}
			setInternal(internalState);
			handleSelection(internalState.light_conditions, "Light_Conditions")
		}
	}

	const handleWeather = (num) => {
		return () => {
			let internalState = {
				...internal,
				weather_conditions: { ...internal.weather_conditions, [num] : !internal.weather_conditions[num] }
			}
			setInternal(internalState);
			handleSelection(internalState.weather_conditions, "Weather_Conditions")
		}
	}

	const handleUrban = (num) => {
		return () => {
			let internalState = {
				...internal,
				urban_or_rural_area: { ...internal.urban_or_rural_area, [num] : !internal.urban_or_rural_area[num] }
			}

			setInternal(internalState)
			handleSelection(internalState.urban_or_rural_area, "Urban_or_Rural_Area")
		}
	}

	const handleRoad = (num) => {
		return () => {
			let internalState = {
				...internal,
				road_surface_conditions: { ...internal.road_surface_conditions, [num] : !internal.road_surface_conditions[num] }
			}

			setInternal(internalState);
			handleSelection(internalState.road_surface_conditions, "Road_Surface_Conditions")
		}
	}

	const handleWeek = (num) => {
		return () => {
			let internalState = {
				...internal,
				day_of_week: { ...internal.day_of_week, [num] : !internal.day_of_week[num] }
			}
			setInternal(internalState)
			handleSelection(internalState.day_of_week, "Day_of_Week");
		}
	}

	function handleSubmit(evt) {

		let light_conditions = []

		for (const [key, value] of Object.entries(internal.light_conditions)) {
			if (value) light_conditions.push(parseInt(key));
		}

		let weather_conditions = []

		for (const [key, value] of Object.entries(internal.weather_conditions)) {
			if (value) weather_conditions.push(parseInt(key));
		}

		let road_surface_conditions = []

		for (const [key, value] of Object.entries(internal.road_surface_conditions)) {
			if (value) road_surface_conditions.push(parseInt(key));
		}

		let urban_or_rural_area = []

		for (const [key, value] of Object.entries(internal.urban_or_rural_area)) {
			if (value) urban_or_rural_area.push(parseInt(key));
		}

		let day_of_week = []

		for (const [key, value] of Object.entries(internal.day_of_week)) {
			if (value) day_of_week.push(parseInt(key));
		}

		let start_date = startDate;
		let end_date = endDate;
		
		let newState = {...state,
			light_conditions: light_conditions, 
			weather_conditions: weather_conditions,
			road_surface_conditions: road_surface_conditions,
			urban_or_rural_area: urban_or_rural_area,
			day_of_week: day_of_week,
			date: {
				start: startDate,
				end: endDate
			}
		}

		setState(newState)

		let changeOustideState = props.submit;
		changeOustideState(newState);
	}

	return <>
	<Legend/>
	<div className="filtering-options-container">
		<div className="filtering-header">
			<p className="filtering-header-text">Analysis Options</p>
			<Icon className="filtering-container-arrow" name="arrow right"/>
		</div>
		
		<div className="filtering-options">
			<br/>
			<div className="light-conditions-filter filter">
				<h3>Light Conditions</h3>
				{/* ( 1 | 4 | 5 | 6 | 7 | -1 */}
				<div className="buttons-row">
					<Popup content='Daylight' trigger={
						<div><Button circular name='1' icon='sun' color={internal.light_conditions["1"] ? 'green' : null} onClick={handleLight("1")}/></div>
					}/>
					<Popup content='Darkness - street lights on' trigger={
						<div><Button circular name='4' icon='lightbulb outline' color={internal.light_conditions["4"] ? 'green' : null} onClick={handleLight("4")}/></div>
					}/>
					<Popup content='Darkness - street lights off' trigger={
						<div>
					<Button circular name='5' icon='lightbulb' color='green' color={internal.light_conditions["5"] ? 'green' : null} onClick={handleLight("5")}/>
						</div>
					}/>
					<Popup content='Darkness - no lighting' trigger={
						<div>
					<Button circular name='6' icon='moon outline' color='green' color={internal.light_conditions["6"] ? 'green' : null} onClick={handleLight("6")}/>
					</div>
					}/>
					<Popup content='Darkness - lighting unknown' trigger={
						<div>
					<Button circular name='7' icon='moon' color='green' color={internal.light_conditions["7"] ? 'green' : null} onClick={handleLight("7")}/>
						</div>
					}/>
					<Popup content='Data missing' trigger={
						<div>
					<Button circular name='-1' icon='close' color='green' color={internal.light_conditions["-1"] ? 'green' : null} onClick={handleLight("-1")}/>
						</div>
					}/>
				</div>
			</div>
			<br/>
			<div className="weather-conditions-filter filter">
				<h3>Weather Conditions</h3>
				<div className='buttons-row'>
					<Popup content='Clear, no fast winds' trigger={
						<div>
						<Button circular name='1' icon='sun' color={internal.weather_conditions["1"] ? 'green' : null} onClick={handleWeather("1")}/>
						</div>
					}/>
					<Popup content='Raining, no fast winds' trigger={
						<div>
					<Button circular name='2' icon='rain' color={internal.weather_conditions["2"] ? 'green' : null} onClick={handleWeather("2")}/>
						</div>
					}/>
					<Popup content='Snowing, no fast winds' trigger={
						<div>
					<Button circular name='3' icon='snowflake' color={internal.weather_conditions["3"] ? 'green' : null} onClick={handleWeather("3")}/>
					</div>
					}/>
					<Popup content='Clear, fast winds' trigger={
						<div>
					<Button circular name='4' color={internal.weather_conditions["4"] ? 'green' : null} onClick={handleWeather("4")}>
						<FontAwesomeIcon icon={faWind} />
					</Button>
					</div>
					}/>
					<Popup content='Raining, fast winds' trigger={
						<div>
					<Button circular name='5' color='green' color={internal.weather_conditions["5"] ? 'green' : null} onClick={handleWeather("5")}>
						<FontAwesomeIcon icon={faCloudRain} />
					</Button>
					</div>
					}/>
					<Popup content='Snowing, fast winds' trigger={
						<div>
					<Button circular name='6' color='green' color={internal.weather_conditions["6"] ? 'green' : null} onClick={handleWeather("6")}> 
						<FontAwesomeIcon icon={faSnowflake} />
					</Button>
					</div>
					}/>
					<Popup content='Fog or mist' trigger={
						<div>
						<Button circular name='7' color='green' color={internal.weather_conditions["7"] ? 'green' : null} onClick={handleWeather("7")}>
							<FontAwesomeIcon icon={faCloud}/>
						</Button>
					</div>
					}/>
					<Popup content='Other' trigger={
						<div>
					<Button circular name='8' icon='bars' color={internal.weather_conditions["8"] ? 'green' : null} onClick={handleWeather("8")}/>
					</div>
					}/>
					<Popup content='Unknown' trigger={
						<div>
					<Button circular name='9' icon='question' color={internal.weather_conditions["9"] ? 'green' : null} onClick={handleWeather("9")}/>
					</div>
					}/>
					<Popup content='Data missing' trigger={
						<div>
					<Button circular name='-1' icon='close' color='green' color={internal.weather_conditions["-1"] ? 'green' : null} onClick={handleWeather("-1")}/>
					</div>
					}/>
				</div>
			</div>
			<br/>
			<div className="road-surface-conditions-filter filter">
				<h3>Road Surface Conditions</h3>
				<div className='buttons-row'>
					<Popup content='Dry' trigger={
						<div>
						<Button circular name='1' color={internal.road_surface_conditions["1"] ? 'green' : null} onClick={handleRoad("1")}>
						<FontAwesomeIcon icon={faRoad}/>
					</Button>
						</div>
					}/>
					<Popup content='Wet or damp' trigger={
						<div>
					<Button circular name='2'  color={internal.road_surface_conditions["2"] ? 'green' : null} onClick={handleRoad("2")}>
						<FontAwesomeIcon icon={faWaterLadder}/>
					</Button>
					</div>
					}/>
					<Popup content='Snow' trigger={
						<div>
					<Button circular name='3' icon='snowflake' color={internal.road_surface_conditions["3"] ? 'green' : null} onClick={handleRoad("3")}/>
						</div>
					}/>
					<Popup content='Frost or ice' trigger={
						<div>
					<Button circular name='4' color={internal.road_surface_conditions["4"] ? 'green' : null} onClick={handleRoad("4")}>
						<FontAwesomeIcon icon={faIcicles}/>
					</Button>
						</div>
					}/>
					<Popup content='Flood over 3cm. deep' trigger={
						<div>
					<Button circular name='5' color='green' color={internal.road_surface_conditions["5"] ? 'green' : null} onClick={handleRoad("5")}>
							<FontAwesomeIcon icon={faWater}/>
						</Button>
						</div>
					}/>
					<Popup content='Spilled oil or diesel' trigger={
						<div>
					<Button circular name='6' icon='tint' color='green' color={internal.road_surface_conditions["6"] ? 'green' : null} onClick={handleRoad("6")}/>
						</div>
					}/>
					<Popup content='Mud' trigger={
						<div>
					<Button circular name='7' color='green' color={internal.road_surface_conditions["7"] ? 'green' : null} onClick={handleRoad("7")}>
							<FontAwesomeIcon icon={faTrash}/>
						</Button>
						</div>
					}/>
					<Popup content='Unknown' trigger={
						<div>
					<Button circular name='9' icon='question' color={internal.road_surface_conditions["9"] ? 'green' : null} onClick={handleRoad("9")}/>
						</div>
					}/>
					<Popup content='Data missing' trigger={
						<div>
					<Button circular name='-1' icon='close' color='green' color={internal.road_surface_conditions["-1"] ? 'green' : null} onClick={handleRoad("-1")}/>
						</div>
					}/>
				</div>
			</div>
			<br/>
			<div className="urbal-or-rural-area-filter filter">
				<h3>Urban or Rural Area</h3>
				<div className='buttons-row'>
					<Popup content='Urban' trigger={
						<div>
						<Button circular name='1' icon='building' color={internal.urban_or_rural_area["1"] ? 'green' : null} onClick={handleUrban("1")}/>
						</div>
					}/>
					<Popup content='Rural' trigger={
						<div>
						<Button circular name='2' icon='home' color={internal.urban_or_rural_area["2"] ? 'green' : null} onClick={handleUrban("2")}/>
						</div>
					}/>
					<Popup content='Unallocated' trigger={
						<div>
							<Button circular name='3' icon='question' color={internal.urban_or_rural_area["3"] ? 'green' : null} onClick={handleUrban("3")}/>
						</div>
					}/>
					<Popup content='Data missing' trigger={
						<div>
						<Button circular name='-1' icon='close' color='green' color={internal.urban_or_rural_area["-1"] ? 'green' : null} onClick={handleUrban("-1")}/>
						</div>
					}/>
				</div>
			</div>
			<br/>
			<div className="day-of-week-filter filter">
				<h3>
					Day Of Week			
				</h3>
				<div className='buttons-row'>
					<Popup content='Sunday' trigger={
						<div>
					<Button circular name='1' color={internal.day_of_week["1"] ? 'green' : null} onClick={handleWeek("1")}>S</Button>
					</div>
					}/>
					<Popup content='Monday' trigger={
						<div>
					<Button circular name='2' color={internal.day_of_week["2"] ? 'green' : null} onClick={handleWeek("2")}>M</Button>
					</div>
					}/>
					<Popup content='Tuesday' trigger={
						<div>
					<Button circular name='3' color={internal.day_of_week["3"] ? 'green' : null} onClick={handleWeek("3")}>T</Button>
					</div>
					}/>
					<Popup content='Wednesday' trigger={
						<div>
					<Button circular name='4' color={internal.day_of_week["4"] ? 'green' : null} onClick={handleWeek("4")}>W</Button>
					</div>
					}/>
					<Popup content='Thursday' trigger={
						<div>
					<Button circular name='5' color='green' color={internal.day_of_week["5"] ? 'green' : null} onClick={handleWeek("5")}>T</Button>
					</div>
					}/>
					<Popup content='Friday' trigger={
						<div>
					<Button circular name='6' color='green' color={internal.day_of_week["6"] ? 'green' : null} onClick={handleWeek("6")}>F</Button>
					</div>
					}/>
					<Popup content='Saturday' trigger={
						<div>
					<Button circular name='7' color='green' color={internal.day_of_week["7"] ? 'green' : null} onClick={handleWeek("7")}>
						S
					</Button>
					</div>
					}/>
				</div>
			</div>
			<br/>
			<div className="date-filter filter">
				<h3>
					Date
				</h3>
				<div className="buttons-row">
					<div>
						<h4> Start </h4>
						<input type="date" id="start" name="trip-start" value={startDate}
							min="2015-01-01" max="2015-12-31" {...bindStartDate}/>
					</div>
					<div>
						<h4> End </h4>
						<input type="date" id="start" name="trip-start" value={endDate}
							min="2015-01-01" max="2015-12-31" {...bindEndDate}/>
					</div>
				</div>
			</div>
			<br/>
			<div>
			<Button className="submit-button" onClick={handleSubmit} color='blue'>
				Refresh map
			</Button>
			</div>

			<br/>
			<h4>
				Number of data points currently displayed: <b>{props.numDataPoints !== undefined ? props.numDataPoints : 0}</b> 
				<br/>
				<i>Showing period between <b>{startDate}</b> till <b>{endDate}</b> </i>
			</h4>
		</div>
	</div>
	<CorrelationButton corr={corr} selected={selected}/>
	</>;
}
