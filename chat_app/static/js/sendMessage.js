document.addEventListener('DOMContentLoaded', function() { //if loaded

    // send to "send" in json //
  document.getElementById('message-form').addEventListener('submit', // if send message
                                                           function(e) {
    e.preventDefault();

    const data = {
      username: document.querySelector('#username').value,
      room_id: document.querySelector('#room_id').value,
      message: document.querySelector('#message').value,
      csrfmiddlewaretoken: document.querySelector('input[name="csrfmiddlewaretoken"]').value
    };
      
    const xhr = new XMLHttpRequest();

    xhr.open('POST', '/send', true);
    xhr.setRequestHeader('X-CSRFToken', data.csrfmiddlewaretoken); // set csrf
    xhr.send(JSON.stringify(data)); // send to "send" in json
    
    document.getElementById('message').value = '' // makes the input empty
  });

  const room_name = document.getElementById('room_name').textContent


  // get all messages and show it //
    setInterval(function() {

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/getMessages/${room_name}/`, true);
    xhr.onreadystatechange = function() {

      if (xhr.readyState === 4) { // the request is completed

        if (xhr.status === 200) { // the response is successful

          const response = JSON.parse(xhr.responseText);
          const display = document.querySelector('#display');

          display.innerHTML = ''; // deletes messages

          for (const key in response.messages) {
            
             // adds a block with a message //
            const message = response.messages[key];
            const container = document.createElement('div');
            container.className = 'message';
            container.innerHTML = `
              <h3>${message.userName}:</h3>
              <p>${message.value}</p>
              <p>${message.date.replace('T', ' ').slice(0, -5)}</p>
            `; // 2024-05-26T15:34:21.072Z => 2024-05-26 15:34:21

            display.appendChild(container);
          }

        } else {
          console.error('Error fetching messages:', xhr.status, xhr.statusText);
        }
      }
    };
    xhr.send();
}, 1000);
});
