const news_letter = document.getElementById(`news_letter`);
const news_btn = document.getElementById(`news_btn`);

const add_newsletter = () => {
  const fields = [news_letter];

  let missing_field = false;

  fields.forEach((element) => {
    if (element.value === `` || !element.value.match("@")) {
      missing_field = true;
      element.style.border = "1px solid #e93c39d0";
    } else {
      element.style.border = "1px solid #e6e7e9";
    }
  });

  if (missing_field) {
    showNotification(
      `<i class="fa fa-envelope"></i>  Please provide a Valid Email !`,
      "success"
    );
    return;
  }

  hiding_over_index.style.display = "block";
  news_btn.innerHTML = `<i class="fa fa-spinner fa-spin px-4"></i>`;

  // Send Data to Database
  fetch(`${localhost}/api/newsletter`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: news_letter.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        showNotification(
          `<i class="fa fa-envelope"></i>   Subscribed to Newsletter Successfully !`,
          "success"
        );
        news_btn.innerHTML = `SIGNUP`;
        setTimeout(function () {
          window.location.href = "/index.html";
        }, 2500);
      } else {
        showNotification("Unable to SignUp, Try Again !", "success");
      }
    })
    .catch((error) => {
      console.error(`Error :`, error);
    });
};
