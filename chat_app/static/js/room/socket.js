let isLoading = true;
const userAndRoomName = document.getElementById('data').textContent;
// connect to websocket
const socket = new WebSocket(`ws://${window.location.host}/ws/chat/${userAndRoomName}/`);



socket.onopen = () => {
    //sends the initialization message with time zone
    const timezoneOffset = new Date().getTimezoneOffset();
    const initMessage = {
        'type': 'init',
        'timezone': timezoneOffset
    };
    send(initMessage);
};


socket.onmessage = (e) => {
  // get something from backend
  const data = JSON.parse(e.data);

  if (!Array.isArray(data)) {

    // if one message
    addMessage(data);

  } else { // if more then one

    // while add messages loading is true
    isLoading = true;
    data.forEach(message => {
      addMessage(message);
    })
    isLoading = false;

  }
};


// not necessary
socket.onclose = () => {
    console.log('Соединение закрыто');
};


// not necessary
socket.onerror = (error) => {
    console.error('Ошибка WebSocket:', error);
};


// convert to JSON and send it
const send = (data) => {
  socket.send(JSON.stringify(data));
}