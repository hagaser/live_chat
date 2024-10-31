// add error
const throwError = (text) => {
  const formBlock = document.getElementById('find-room-block');
  const err = document.createElement("p");
  err.className = "error";
  err.textContent = text;
  formBlock.appendChild(err);
}

// remove spases in begin and end and replase spases with "_"
const formatting = (str) => {
  str.trim().replace(/ /g, '_');
}


window.onload = () => {

  const body = document.querySelector('body')
  const form = document.getElementById("find-room")

  // remove error on click
  body.addEventListener("click", () => {
    const err = document.getElementsByClassName("error")[0];
    if (err) {
      err.remove();
    }
  })

  // validation
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const userName = document.querySelector('#user-name').value;
    const roomName = document.querySelector('#room-name').value;
    // remove spases in begin and end and replase spases with "_"
    formatting(userName);
    formatting(roomName);

    // not allowed char
    const regex = /[\/=`~!@#$%^&*()\-+="№;:?{}\[\]'\\|<>,.]/;

    // if have regex char
    if (regex.test(userName) || regex.test(roomName)) {
      throwError("Nonvaluable char: " + regex.toString());
      return
    }

    // if too long
    if (userName.length > 40 || roomName.length > 40){
      throwError("Too much char on the fild no more then 40");
      return
    }

    // if empty or submit
    if (userName && roomName) {
      form.submit();
    } else {
      throwError("One of the fields is empty");
    }

  })
}