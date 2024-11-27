const autoResize = (textarea) => {
  // make smaller if delete chars
  textarea.style.height = 'auto';
  // make bigger if smaller then 200px
  textarea.style.height = (textarea.scrollHeight > 200 ? 200 : textarea.scrollHeight) + 'px';
}


const submitForm = (e, input) => {
  e.preventDefault();

  // remove \n and spases at the beginning and end of the message
  const message = input.value.replace(/^\n+|\n+$/g, '').trim();
  // if empty
  if (!message) {return}

  send({
    'message': message,
  });

  // clears the input
  input.value = '';
  // resize input
  input.style.height = "auto";
}


const addMessage = (data) => {

  // does time formatting "2024-10-31T17:39:33.991610+03:00" => "2024-10-31 17:39:33"
  const date = new Date(data.date).toLocaleString("sv-SE").replace('T', ' ');

  const messageField = document.getElementById("message-field");
  const loadOld = document.getElementById("load-old");

  const message = document.createElement("div");
  message.className = "message";
  message.innerHTML = `<p>${date}</p><p>${data.userName}:</p><pre>${data.message}</pre>`;

  if (data.new) { // if new message
    messageField.appendChild(message);
    // scroll to the bottom
    messageField.scrollTop = messageField.scrollHeight;

  } else { // if old
    const oldScrollTop = messageField.scrollTop;
    const oldScrollHeight = messageField.scrollHeight;

    messageField.insertBefore(message, loadOld.nextSibling);
    
    // make scrollbar stay on the place
    messageField.scrollTop = messageField.scrollHeight - oldScrollHeight + oldScrollTop;
  }
}