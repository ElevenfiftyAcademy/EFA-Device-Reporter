const SystemInformation = require("systeminformation");

const mainView = document.getElementById("main");
const emailInput = document.getElementById("emailEntry");
const runButton = document.getElementById("systemDetectionButton");
const cardbody = document.getElementById("form");
const spinner = document.getElementById('spinner');
const finalMessage = document.getElementById('finalMessage');

const myCard = document.getElementById('myCard');

let emailValue = "";

runButton.addEventListener("click", generateSystemInformation);
emailInput.addEventListener("keyup", (e) => {
  emailValue = e.target.value;
});

async function generateSystemInformation() {
  /*
    This function's purpose is to sequentially retrieve the system's specifications.
  */

  if (emailValue) {

    myCard.classList.add("sizeAfter");
    cardbody.style.display = "none";
    spinner.style.display = "block";

    try {
      const { manufacturer, model, serial } = await SystemInformation.system();
      const report = {
        email: emailValue,
        manufacturer,
        model,
        serial
      }
      let response = await (
        await fetch(
          "https://9kw1s4d2r9.execute-api.us-east-2.amazonaws.com/Main/itServer",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(report),
          }
        )
      ).json();
      console.log(response);
      spinner.style.display = "none";
      finalMessage.style.display = "block";

    } catch (e) {
      console.log(e);
      console.log(response);
      spinner.style.display = "none";
      cardbody.style.display = "block";
    }
  }
}
