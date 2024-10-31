const autoResize = (textarea) => {
  // make smaller if delete chars
  textarea.style.height = 'auto';
  // make bigger if smaller then 200px
  textarea.style.height = (textarea.scrollHeight > 200 ? 200 : textarea.scrollHeight) + 'px';
}

const submitForm = (e, input) => {
  e.preventDefault();

  const message = input.value.replace(/^\n+|\n+$/g, '').trim();
  if (!message) {return}

  send({
    'message': message,
  });

  input.value = '';
  input.style.height = "auto";
}

const addMessage = (data) => {

  const date = new Date(data.date).toLocaleString("sv-SE").replace('T', ' ');

  const messageField = document.getElementById("display");
  const loadOld = document.getElementById("load-old");
  const message = document.createElement("div");

  message.className = "message";
  message.innerHTML = `<p>${date}</p><p>${data.userName}:</p><pre>${data.message}</pre>`;

  if (data.new) {
    messageField.appendChild(message);
    messageField.scrollTop = messageField.scrollHeight;

  } else {
    oldScrollPos = messageField.scrollTop;
    oldScrollHeight = messageField.scrollHeight;

    messageField.insertBefore(message, loadOld.nextSibling);
    
    messageField.scrollTop = messageField.scrollHeight - oldScrollHeight + oldScrollPos;
  }
}

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

window.onload = () => {
  const message = document.getElementById('message')
  message.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      submitForm(e, message);
    }
  });

  document.getElementById('message-form').addEventListener('submit', (e) => {submitForm(e, message)});

  document.getElementById("load-old").addEventListener("click", () => {
    send({
      'type': "load_old"
    });
  })

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !isLoading) {
        send({
          'type': "load_old"
        });
      }
    });
  });

  const loadOld = document.getElementById("load-old");
  observer.observe(loadOld);

}