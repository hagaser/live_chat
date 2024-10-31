window.onload = () => {

  const message = document.getElementById('message');
  

  // submit on enter and allow \n
  message.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      submitForm(e, message);
    }
  });


  // submit form but do some check and formatting before
  const messageForm = document.getElementById('message-form')
  messageForm.addEventListener('submit', (e) => {submitForm(e, message)});


  // if scroll up to top then load more old messages
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !isLoading) {
        //request for more messages
        send({'type': "load_old"});

      }
    });
  });

  // add observer on block
  const loadOld = document.getElementById("load-old");
  observer.observe(loadOld);

}