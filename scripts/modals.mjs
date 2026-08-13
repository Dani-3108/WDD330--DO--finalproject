// dialogs
const pairs = [
    { btn: "#button-one", dialog: "#modal-one", close: "#closeModal-1" },
    { btn: "#button-two", dialog: "#modal-two", close: "#closeModal-2" },
    { btn: "#button-three", dialog: "#modal-three", close: "#closeModal-3" },
    { btn: "#button-four", dialog: "#modal-four", close: "#closeModal-4" }
];

pairs.forEach((pair) => {
    const button = document.querySelector(pair.btn);
    const dialog = document.querySelector(pair.dialog);
    const closeButton = document.querySelector(pair.close);

    button.addEventListener("click", () => {
        dialog.showModal();
    });
    closeButton.addEventListener("click", () => {
        dialog.close();
    });
});