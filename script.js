function closeChat() {
    document.querySelector('.chat-container').style.display = 'none';
}

function sendPrompt() {
    // Get the input element
    var inputElement = document.querySelector('.chat-footer input[type="text"]');
    // Get the value typed into the input field
    var message = inputElement.value;
    // Log the message to the console
    console.log("Message:", message);
    // Create a new div element to display the message
    var messageElement = document.createElement('div');
    messageElement.textContent = message;
    // Get the chat body element
    var chatBody = document.querySelector('.chat-body');
    // Append the new message element to the chat body
    chatBody.appendChild(messageElement);
    // Clear the input field after sending the message
    
    inputElement.value = "";

    fetch('http://localhost:5500/generateResponse', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: message })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response:', data);
        // Update HTML to display response
        document.getElementById('response').textContent = data.response;
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('submitButton').addEventListener('click', sendPrompt);







