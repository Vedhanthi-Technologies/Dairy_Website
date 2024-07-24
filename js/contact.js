const contact_name = document.getElementById(`contact_name`);
const contact_email = document.getElementById(`contact_email`);
const contact_subject = document.getElementById(`contact_subject`);
const contact_message = document.getElementById(`contact_message`);
const contact_btn = document.getElementById(`contact_btn`);

const contact_admin = () => {
  const fields = [
    contact_name,
    contact_email,
    contact_subject,
    contact_message,
  ];

  let missing_field = false;

  fields.forEach((element) => {
    if (element.value === ``) {
      missing_field = true;
      element.style.border = "1px solid #e93c39d0";
    } else {
      element.style.border = "1px solid #e6e7e9";
    }
  });

  if (missing_field) {
    showNotification(
      `<i class="fa-solid fa-cheese"></i> Please Fill All the Fields !`,
      "success"
    );
    return;
  }

  hiding_over_index.style.display = "block";
  contact_btn.innerHTML = `<i class="fa-solid fa-spin fa-spinner"></i> SENDING ...`;

  // Send to Database
  fetch(`${localhost}/api/contact`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: contact_name.value,
      email: contact_email.value,
      subject: contact_subject.value,
      message: contact_message.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        showNotification(
          `<i class="fa fa-envelope fa-beat"></i>  Message Sent Successfully !`,
          "success"
        );
        contact_btn.innerHTML = "Send Message";
        setTimeout(function () {
          window.location.href = "/index.html";
        }, 1500);
      } else {
        showNotification("Unable to Send Message, Try Again !", "success");
        hiding_over_index.style.display = "none";
        setTimeout(function () {
          window.location.href = "/index.html";
        }, 1500);
      }
    })
    .catch((error) => {
      console.error(`Error :`, error);
    });
};
