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