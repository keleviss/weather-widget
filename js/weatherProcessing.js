// ===============================================================================
// Process the forecast json response, calculate the avg weather for each day, and determine the weather icon for each day
export default async function processForecastData(forecastList) {
  // console.log(forecastList);
  if (forecastList.length > 0) {
    try {
      const datesList = [];

      for (let i = 0; i < forecastList.length; i++) {
        const dayObject = {
          date: forecastList[i].dt_txt.split(' ')[0],
          temperature: forecastList[i].main.temp,
          icon: forecastList[i].weather[0].icon
        };

        datesList.push(dayObject);
      }

      const dates = getForecastDates(datesList);
      // console.log(dates);
      const avgList = calculateDailyAverages(dates, datesList);
      // console.log(avgList);
      return avgList;

    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

// Function to extract unique date values from the forecast list
function getForecastDates(list) {
  const dates = [];

  for (let i = 0; i < list.length; i++) {
    const date = list[i].date;
    if (!dates.includes(date)) {
      dates.push(date);
    }
  }

  if (dates.length > 5) {
    dates.shift();
  }

  return dates;
}

// Function to get the average temperature for each unique date
function calculateDailyAverages(dates, list) {
  const avgList = [];

  for (let i = 0; i < dates.length; i++) {
    const similarDates = list.filter(item => item.date === dates[i])
    const sum = similarDates.reduce((sum, item) => sum += item.temperature, 0);
    const avg = Math.round(sum / similarDates.length);
    const avgIcon = determineMostCommonIcon(similarDates);

    const avgItem = {
      date: dates[i],
      avgTemp: avg,
      icon: avgIcon
    }
    
    avgList.push(avgItem);
  }

  return avgList;
}

// Function to determine the most common weather conditions icon for each date
function determineMostCommonIcon(dates) {
  const iconCount = {};

  dates.forEach(date => {
    let icon = date.icon;
    icon = icon.slice(0, -1);

    if (iconCount[icon]) {
      iconCount[icon]++;
    } else {
      iconCount[icon] = 1;
    }
  });

  let mostCommonIcon = null;
  let maxCount = 0;

  for (const icon in iconCount) {
    if (iconCount[icon] > maxCount) {
      maxCount = iconCount[icon];
      mostCommonIcon = icon;
    }
  }

  return mostCommonIcon;
}