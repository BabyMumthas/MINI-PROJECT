/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const Notification = ({ notification }) => {
    if (!notification) return null;
  
    const notificationStyle = {
      color: notification.type === "error" ? "red" : "green",
      background: "lightgrey",
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    };
  
    return <div style={notificationStyle}>{notification.message}</div>;
  };
  
  export default Notification;
  
