const localhost = `http://localhost:3005`;

// Format Date
function formatDate(dateStr) {
  const date = new Date(dateStr);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dev",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

  return formattedDate;
}

// Show Notification
const showNotification = (message, className) => {
  const notification = document.createElement("div");
  notification.className = `notification ${className}`;

  notification.innerHTML = message;

  const notificationContainer = document.getElementById(
    "notification-container"
  );
  notificationContainer.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
};
