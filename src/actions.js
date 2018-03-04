import xhr from 'xhr';

export function changeLocation(location) {
	return {
		type: 'CHANGE_LOCATION',
		location: location
	};
}

export function setSelectedDate(date) {
  return {
    type: 'SET_SELECTED_DATE',
    date: date
  };
}

export function setSelectedTemp(temp) {
  return {
    type: 'SET_SELECTED_TEMP',
    temp: temp
  };
}

export function setData(data) {
  return {
    type: 'SET_DATA',
    data: data
  };
};

export function setDates(dates) {
  return {
    type: 'SET_DATES',
    dates: dates
  };
};

export function setTemps(temps) {
  return {
    type: 'SET_TEMPS',
    temps: temps
  };
};

export function setTempsf(tempsf) {
  return {
    type: 'SET_TEMPSF',
    tempsf: tempsf
  };
};

export function setTempsk(tempsk) {
  return {
    type: 'SET_TEMPSK',
    tempsk: tempsk
  };
};

export function fetchData(url) {
  return function thunk(dispatch) {
    xhr({
      url: url
    }, function (err, data) {

      var body = JSON.parse(data.body);
			//console.log(body);
      var list = body.list;
      var dates = [];
      var temps = [];
			var tempsf = [];
			var tempsk = [];
      for (var i = 0; i < list.length; i++) {
        dates.push(list[i].dt_txt);
        temps.push(list[i].main.temp);
				tempsf.push(list[i].main.temp*1.8 + 32);
				tempsk.push(list[i].main.temp + 273.15);
      }
      dispatch(setData(body));
      dispatch(setDates(dates));
      dispatch(setTemps(temps));
			dispatch(setTempsf(tempsf));
			dispatch(setTempsk(tempsk));
      dispatch(setSelectedDate(''));
      dispatch(setSelectedTemp(null));
    });
  }
}
