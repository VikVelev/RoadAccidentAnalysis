class Accident:

    def __init__(self, le_osgr, ln_osgr, long, lat, sev, vehicles, casualties, date, day_of_week, time, authority_district, authority_highway, first_road_class, first_road_number, road_type, speed_limit, junction_detail, junction_control, second_road_class, second_road_number, light, weather, road_surface, urban_or_rural, casualty_sev, casualty_type, junction_location):
        self.le_osgr = le_osgr
        self.ln_osgr =ln_osgr
        self.long=long
        self.lat=lat
        self.sev=sev
        self.vehicles=vehicles
        self.casualties=casualties
        self.date=date
        self.day_of_week=day_of_week
        self.time=time
        self.authority_district=authority_district
        self.authority_highway=authority_highway
        self.first_road_class=first_road_class
        self.first_road_number=first_road_number
        self.road_type=road_type
        self.speed_limit=speed_limit
        self.junction_detail=junction_detail
        self.junction_control=junction_control
        self.second_road_class=second_road_class
        self.second_road_number=second_road_number
        self.light=light
        self.weather=weather
        self.road_surface=road_surface
        self.urban_or_rural=urban_or_rural
        self.casualty_sev=casualty_sev
        self.casualty_type=casualty_type
        self.junction_location=junction_location