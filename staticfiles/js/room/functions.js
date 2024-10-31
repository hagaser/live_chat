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