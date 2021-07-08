function randomTime(start, end, startHour, endHour) {
  var date = new Date(+start + Math.random() * (end - start));
  var hour = (startHour + Math.random() * (endHour - startHour)) | 0;
  date.setHours(hour);
  return date.toLocaleTimeString();
}

function randomNumber(no) {
  const rndInt = Math.floor(Math.random() * no) + 1;
  return rndInt;
}

function createFlights(flight_obj) {
  let finalArr = [];
  for (let index = 0; index < 6; index++) {
    const num = randomNumber(30);
    const num1 = randomNumber(18);
    const obj = {
      ...flight_obj,
      departureTime: randomTime(num, num1, num, num1),
      arrivalTime: randomTime(num1, num, num1, num),
      fare: randomNumber(9000),
    };

    if (flight_obj.flightType == "return") {
      obj.returnFlight = {
        departureTime: randomTime(num1, num1, num, num1),
        arrivalTime: randomTime(num, num, num1, num),
      };
    }
    finalArr.push(obj);
  }
  return finalArr;
}

export { createFlights };
