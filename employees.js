document.addEventListener('DOMContentLoaded', function () {
    const timesheetForm = document.getElementById('timesheetForm');
    timesheetForm.addEventListener('submit', submitTimesheet);
  
    async function submitTimesheet(event) {
      event.preventDefault();
  
      const formData = new FormData(timesheetForm);
      const date = formData.get('date');
      const hours = formData.get('hours');
  
      if (!date || !hours) {
        alert('Please fill out all fields.');
        return;
      }
  
      const timesheetData = { employeeId, date, hours };
  
      try {
        const response = await fetch('/submitTimesheet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(timesheetData)
        });
        if (!response.ok) {
          throw new Error('Failed to submit timesheet');
        }
        alert('Timesheet submitted successfully.');
        timesheetForm.reset();
      } catch (error) {
        console.error('Error submitting timesheet:', error);
        alert('Error submitting timesheet. Please try again later.');
      }
    }
  });