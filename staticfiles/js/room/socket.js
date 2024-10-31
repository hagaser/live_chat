let isLoading = true;
const userAndRoomName = document.getElementById('data').textContent;
const socket = new WebSocket(`ws://${window.location.host}/ws/chat/${userAndRoomName}/`);

socket.onopen = () => {
    const timezoneOffset = new Date().getTimezoneOffset();
    const initMessage = {
        'type': 'init',
        'timezone': timezoneOffset
    };
    send(initMessage);
};

socket.onmessage = (e) => {
  const data = JSON.parse(e.data);
  if (Array.isArray(data)) {
    isLoading = true;
    data.forEach(message => {
      addMessage(message);
    });
    isLoading = false;
  } else {
    addMessage(data);
  }
};

socket.onclose = () => {
    console.log('Соединение закрыто');
};

socket.onerror = (error) => {
    console.error('Ошибка WebSocket:', error);
};

const send = (data) => {
  socket.send(JSON.stringify(data))
}