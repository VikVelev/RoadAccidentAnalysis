import React, { useState } from 'react';
import {Icon, Button } from 'semantic-ui-react'

export default function FilteringOptions(props) {

	const [ state, setState ] = useState({
		"detail" : 4,
        "light_conditions" : null,				// ( 1 | 4 | 5 | 6 | 7 | -1 (missing)),
        "weather_conditions": null,				// ( 1 to 8 | 9 (unknown) | -1 (missing)), 
        "road_surface_conditions": null, 		// ( 1 to 7 | 9 (unkown) | -1 (missing)),
        "urban_or_rural_area" : null, 			// ( 1 | 2 | 3 | -1 (missing)),
        "day_of_week" : null, 					// ( 1 - Sunday to 7 - Saturday),
        "date" : {
            "start" : "02/02/2015", // some date, (optional)
            "end" :  "02/04/2015" // some date,   (optional)
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
	
	function handleChange(evt) {
		const value = evt.target.value;
		const name = evt.target.name;
		
		if (name.includes(".")) {
			let [ parent, child ] = name.split(".");
			setState({ ...state, [parent]: { ...state[parent], [child] : value }});
		} else {
			setState({ ...state, [name]: value });
		}
	}

	const handleLight = (num) => {
		return () => {
			setInternal({
				...internal,
				light_conditions: { ...internal.light_conditions, [num] : !internal.light_conditions[num] }
			})
		}
	}

	const handleWeather = (num) => {
		return () => {
			setInternal({
				...internal,
				weather_conditions: { ...internal.weather_conditions, [num] : !internal.weather_conditions[num] }
			})
		}
	}

	const handleUrban = (num) => {
		return () => {
			setInternal({
				...internal,
				urban_or_rural_area: { ...internal.urban_or_rural_area, [num] : !internal.urban_or_rural_area[num] }
			})
		}
	}

	const handleRoad = (num) => {
		return () => {
			setInternal({
				...internal,
				road_surface_conditions: { ...internal.road_surface_conditions, [num] : !internal.road_surface_conditions[num] }
			})
		}
	}

	const handleWeek = (num) => {
		return () => {
			setInternal({
				...internal,
				day_of_week: { ...internal.day_of_week, [num] : !internal.day_of_week[num] }
			})
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
		
		let newState = {...state,
			light_conditions: light_conditions, 
			weather_conditions: weather_conditions,
			road_surface_conditions: road_surface_conditions,
			urban_or_rural_area: urban_or_rural_area,
			day_of_week: day_of_week
		}

		setState(newState)

		let changeOustideState = props.submit;
		changeOustideState(newState);
	}

	return <div className="filtering-options-container">
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
					<Button circular name='1' icon='sun' color={internal.light_conditions["1"] ? 'green' : null} onClick={handleLight("1")}/>
					<Button circular name='4' icon='lightbulb outline' color={internal.light_conditions["4"] ? 'green' : null} onClick={handleLight("4")}/>
					<Button circular name='5' icon='lightbulb' color='green' color={internal.light_conditions["5"] ? 'green' : null} onClick={handleLight("5")}/>
					<Button circular name='6' icon='moon outline' color='green' color={internal.light_conditions["6"] ? 'green' : null} onClick={handleLight("6")}/>
					<Button circular name='7' icon='moon' color='green' color={internal.light_conditions["7"] ? 'green' : null} onClick={handleLight("7")}/>
					<Button circular name='-1' icon='question' color='green' color={internal.light_conditions["-1"] ? 'green' : null} onClick={handleLight("-1")}/>
				</div>
			</div>
			<br/>
			<div className="weather-conditions-filter filter">
				<h3>Weather Conditions</h3>
				<div className='buttons-row'>

				<Button circular name='1' icon='sun' color={internal.weather_conditions["1"] ? 'green' : null} onClick={handleWeather("1")}/>
				<Button circular name='2' icon='lightbulb outline' color={internal.weather_conditions["2"] ? 'green' : null} onClick={handleWeather("2")}/>
				<Button circular name='3' icon='lightbulb outline' color={internal.weather_conditions["3"] ? 'green' : null} onClick={handleWeather("3")}/>
				<Button circular name='4' icon='lightbulb outline' color={internal.weather_conditions["4"] ? 'green' : null} onClick={handleWeather("4")}/>
				<Button circular name='5' icon='lightbulb' color='green' color={internal.weather_conditions["5"] ? 'green' : null} onClick={handleWeather("5")}/>
				<Button circular name='6' icon='moon outline' color='green' color={internal.weather_conditions["6"] ? 'green' : null} onClick={handleWeather("6")}/>
				<Button circular name='7' icon='moon' color='green' color={internal.weather_conditions["7"] ? 'green' : null} onClick={handleWeather("7")}/>
				<Button circular name='8' icon='lightbulb outline' color={internal.weather_conditions["8"] ? 'green' : null} onClick={handleWeather("8")}/>
				<Button circular name='9' icon='lightbulb outline' color={internal.weather_conditions["9"] ? 'green' : null} onClick={handleWeather("9")}/>
				<Button circular name='-1' icon='question' color='green' color={internal.weather_conditions["-1"] ? 'green' : null} onClick={handleWeather("-1")}/>
				</div>
			</div>
			<br/>
			<div className="road-surface-conditions-filter filter">
				<h3>Road Surface Conditions</h3>
				<div className='buttons-row'>
				<Button circular name='1' icon='sun' color={internal.road_surface_conditions["1"] ? 'green' : null} onClick={handleRoad("1")}/>
				<Button circular name='2' icon='lightbulb outline' color={internal.road_surface_conditions["2"] ? 'green' : null} onClick={handleRoad("2")}/>
				<Button circular name='3' icon='lightbulb outline' color={internal.road_surface_conditions["3"] ? 'green' : null} onClick={handleRoad("3")}/>
				<Button circular name='4' icon='lightbulb outline' color={internal.road_surface_conditions["4"] ? 'green' : null} onClick={handleRoad("4")}/>
				<Button circular name='5' icon='lightbulb' color='green' color={internal.road_surface_conditions["5"] ? 'green' : null} onClick={handleRoad("5")}/>
				<Button circular name='6' icon='moon outline' color='green' color={internal.road_surface_conditions["6"] ? 'green' : null} onClick={handleRoad("6")}/>
				<Button circular name='7' icon='moon' color='green' color={internal.road_surface_conditions["7"] ? 'green' : null} onClick={handleRoad("7")}/>
				<Button circular name='9' icon='lightbulb outline' color={internal.road_surface_conditions["9"] ? 'green' : null} onClick={handleRoad("9")}/>
				<Button circular name='-1' icon='question' color='green' color={internal.road_surface_conditions["-1"] ? 'green' : null} onClick={handleRoad("-1")}/>
				</div>
			</div>
			<br/>
			<div className="urbal-or-rural-area-filter filter">
				<h3>Urban or Rural Area</h3>
				<div className='buttons-row'>
				<Button circular name='1' icon='sun' color={internal.urban_or_rural_area["1"] ? 'green' : null} onClick={handleUrban("1")}/>
				<Button circular name='2' icon='lightbulb outline' color={internal.urban_or_rural_area["2"] ? 'green' : null} onClick={handleUrban("2")}/>
				<Button circular name='3' icon='lightbulb outline' color={internal.urban_or_rural_area["3"] ? 'green' : null} onClick={handleUrban("3")}/>
				<Button circular name='-1' icon='question' color='green' color={internal.urban_or_rural_area["-1"] ? 'green' : null} onClick={handleUrban("-1")}/>
				</div>
			</div>
			<br/>
			<div className="day-of-week-filter filter">
				<h3>
					Day Of Week			
				</h3>
				<div className='buttons-row'>
				<Button circular name='1' icon='sun' color={internal.day_of_week["1"] ? 'green' : null} onClick={handleWeek("1")}/>
				<Button circular name='2' icon='lightbulb outline' color={internal.day_of_week["2"] ? 'green' : null} onClick={handleWeek("2")}/>
				<Button circular name='3' icon='lightbulb outline' color={internal.day_of_week["3"] ? 'green' : null} onClick={handleWeek("3")}/>
				<Button circular name='4' icon='lightbulb outline' color={internal.day_of_week["4"] ? 'green' : null} onClick={handleWeek("4")}/>
				<Button circular name='5' icon='lightbulb' color='green' color={internal.day_of_week["5"] ? 'green' : null} onClick={handleWeek("5")}/>
				<Button circular name='6' icon='moon outline' color='green' color={internal.day_of_week["6"] ? 'green' : null} onClick={handleWeek("6")}/>
				<Button circular name='7' icon='moon' color='green' color={internal.day_of_week["7"] ? 'green' : null} onClick={handleWeek("7")}/>
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
						<input type="date" id="start" name="trip-start"
							value="2018-07-22"
							min="2018-01-01" max="2018-12-31"/>
					</div>
					<div>
						<h4> End </h4>
						<input type="date" id="start" name="trip-start"
							value="2018-07-22"
							min="2018-01-01" max="2018-12-31"/>
					</div>
				</div>
			</div>
			<br/>
			<button className="submitButton" onClick={handleSubmit}>
				Submit
			</button>
			<p>
				Number of data points currently displayed: {props.numDataPoints !== undefined ? props.numDataPoints : 0}
			</p>
		</div>
	</div>;
}
