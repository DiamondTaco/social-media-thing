let inc = 0, req = 0;

dom("toggle-password").addEventListener("click", function() {
  if (dom("password").getAttribute("type") == "password") {
    dom("password").setAttribute("type", "text");
  } else {
    dom("password").setAttribute("type", "password");
  }
});

dom("submit").addEventListener("click", function() {
  this.setAttribute("disabled", "");
  username = dom("username").value;
  sha256(dom("password").value).then((password) => {
    fetch("/api/account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "username": username,
        "password": password
      })
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.valid) {
          setCookie("token", json.token);
          window.location.href = "/home";
        } else {
          dom("submit").removeAttribute("disabled")
          inc++;
          dom("error").innerText = `Unable to login! Reason: ${json.reason}`;
          setTimeout(() => { req++; if (req == inc) { dom("error").innerText = ""; }}, 3000);
        }
      })
      .catch((err) => {
        dom("submit").removeAttribute("disabled")
        inc++;
        dom("error").innerText = "Something went wrong! Try again in a few moments...";
        setTimeout(() => { req++; if (req == inc) { dom("error").innerText = ""; }}, 3000);
        throw(err);
      });
  });
});