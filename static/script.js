document.getElementById('emojiForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    console.log("Form submitted!"); // Log when the form is submitted

    const formData = new FormData(this); // Get the form data

    fetch('http://127.0.0.1:5000/convert', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            console.error('HTTP error', response.status, response.statusText);
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('output').innerHTML = data.emojis; // Display the emojis as HTML
    })
    
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('output').innerText = 'Error generating emojis. Please try again.';
    });
});
