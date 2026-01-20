const BookingCard = () => (
  <div style={{
    position: "absolute",
    right: "40px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "#f3efe8",
    width: "280px",
    padding: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
  }}>
    <h6>SPECIAL OFFERS</h6>
    <p>Book your stay at Hotel Justinos</p>
    <button style={{ background: "#c58b2b", color: "white", border: "none", width: "100%", padding: "10px" }}>BOOK NOW</button>
  </div>
);

export default BookingCard;
