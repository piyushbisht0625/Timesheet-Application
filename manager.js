async function fetchTimesheets() {
    try {
        console.log("KKK");
      const response = await fetch('http://localhost:7000/managers/:managerId/timesheets');
      console.log(data)
      const data = await response.json();
      displayTimesheets(data.timesheets);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  function displayTimesheets(timesheets) {
    const timesheetList = document.getElementById('timesheetList');
    timesheetList.innerHTML = '';
    timesheets.forEach(timesheet => {
      const div = document.createElement('div');
      div.innerHTML = <p>Date: ${timesheet.date}, Hours: ${timesheet.hours}, Rating: ${timesheet.rating}</p>;
      timesheetList.appendChild(div);
    });
  }
  
  //fetchTimesheets();