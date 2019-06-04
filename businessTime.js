const holiday = {
  start: new Date('2019-12-24T21:00:00'),
  end: new Date('2019-12-25T21:00:00')
};

/**
 *
 *
 * @param {*} holiday object {start: <Date>, end: <Date>}
 * @param {*} time Date Object
 * @param {*} duration number of seconds, positive or negative
 * Returns a formatted Date object with local time zone
 */ 
function addBusinessTime(holiday, time, duration) {
  
  // Epoch values of parameters
  const timeValue = time.valueOf();
  const holidayStart = holiday.start.valueOf();
  const holidayEnd = holiday.end.valueOf();

  let date;
  const timeZoneOffset = (holiday.start.getTimezoneOffset() * 60 * 1000);
  // We evaluate if the date is the range of the holiday
  if ((timeValue + (duration + 1000)) >= holidayStart && (timeValue + (duration + 1000)) <= holidayEnd) {
    if (Math.sign(duration) === -1){
      date = new Date((holiday.start.getTime() + (duration * 1000)) - timeZoneOffset);
    } else if (Math.sign(duration) === 1) {
      date = new Date((holiday.end.getTime() + (duration * 1000)) - timeZoneOffset);    
    }
  } else {
    // Otherwise just set the date  
    date = new Date((time.getTime() + (duration * 1000)) - timeZoneOffset);

  }

  // Return the date object with local timezone
  return date;
}

console.log(addBusinessTime(holiday, new Date('2019-12-01T00:00:00'), 60 * 60)); // returns 2019-12-01T01:00:00
console.log(addBusinessTime(holiday, new Date('2019-12-24T21:00:00'), 1)); // returns 2019-12-25T21:00:01
console.log(addBusinessTime(holiday, new Date('2019-12-24T20:30:00'), 60 * 60)); // returns 2019-12-25T21:30:00
console.log(addBusinessTime(holiday, new Date('2019-12-25T00:00:00'), 1)); // returns 2019-12-25T21:00:01
console.log(addBusinessTime(holiday, new Date('2019-12-25T00:00:00'), -1)); // returns 2019-12-24T20:59:59
