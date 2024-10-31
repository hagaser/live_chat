
const roomName = JSON.parse(document.getElementById('room-name').textContent);
const socket = new WebSocket(`ws://${window.location.host}/ws/chat/${roomName}/`);

socket.onopen = () => {
    console.log('Соединение установлено');
};

socket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    console.log('Сообщение от сервера:', data.message);
};

socket.onclose = () => {
    console.log('Соединение закрыто');
};

socket.onerror = (error) => {
    console.error('Ошибка WebSocket:', error);
};
