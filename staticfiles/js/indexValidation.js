const throwError = (text) => {
  const formBlock = document.getElementById('find-room-block');
  const err = document.createElement("p");
  err.className = "error";
  err.textContent = text;
  formBlock.appendChild(err);
}

window.onload = () => {

  const body = document.querySelector('body')
  const form = document.getElementById("find-room")


  body.addEventListener("click", () => {
    const err = document.getElementsByClassName("error")[0];
    if (err) {
      err.remove();
    }
  })

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userName = document.querySelector('#user-name').value;
    const roomName = document.querySelector('#room-name').value;
    const regex = /[ \/=`~!@#$%^&*()\-+="№;:?{}\[\]'\\|<>,.]/;
    if (regex.test(userName) || regex.test(roomName)) {
      throwError("Non avaluable char");
      return
    }
    if (userName.length > 40 || roomName.length > 40){
      throwError("Too much char on the fild no more then 40");
      return
    }
    if (userName && roomName) {
      form.submit();
    } else {
      throwError("One of the fields is empty");
    }
  })
}