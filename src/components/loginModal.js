import { socket } from "../utils/socket.js";

export async function handleLogin() {
  return new Promise((resolve) => {
    const modal = document.getElementById("login-modal");
    const bsModal = new bootstrap.Modal(modal);
    const submitBtn = document.getElementById("username-submit");
    const nameInput = document.getElementById("username-input");

    bsModal.show();

    submitBtn.onclick = () => {
      const username = nameInput.value.trim();
      if (username !== "") {
        socket.emit("register user", username);
        bsModal.hide();
        resolve(username);
      }
    };
  });
}
