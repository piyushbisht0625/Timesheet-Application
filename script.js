document.getElementById('timesheetForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const date = document.getElementById('date').value;
    const hours = document.getElementById('hours').value;
  
    try {
      const response = await fetch('/submitTimesheet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date, hours })
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  });