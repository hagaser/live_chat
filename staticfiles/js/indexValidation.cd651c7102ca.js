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
    if (userName && roomName) {
      form.submit();
    } else {
      const formBlock = document.getElementById('find-room-block');
      const err = document.createElement("p");
      err.className = "error";
      err.textContent = "One of the fields is empty";
      formBlock.appendChild(err);
    }
  })
}