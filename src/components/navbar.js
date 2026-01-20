import { Link } from "react-router-dom";

const Navbar = () => {
  const colors = {
    navy: "#2b2f4a",
    cream: "#e6e8c9"
  };

  const styles = {
    nav: {
      background: colors.cream, // Main Cream Background
      padding: "25px 40px",
      display: "flex",
      flexDirection: "column", // Stack Logo above Nav for a luxury feel
      alignItems: "center",
      gap: "20px",
      borderBottom: `1px solid rgba(43, 47, 74, 0.1)`, // Subtle navy divider
    },
    logo: {
      color: colors.navy,
      fontSize: "24px",
      fontWeight: "bold",
      letterSpacing: "4px",
      margin: 0,
      textDecoration: "none"
    },
    ul: {
      display: "flex",
      listStyle: "none",
      gap: "30px",
      margin: 0,
      padding: 0,
    },
    link: {
      textDecoration: "none",
      color: colors.navy,
      fontSize: "13px",
      fontWeight: "600",
      letterSpacing: "1px",
      transition: "opacity 0.3s ease"
    }
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        HOTEL JUSTINOS
      </Link>

      <ul style={styles.ul}>
        {["ACCOMMODATION", "DINING", "EXPERIENCES", "OFFERS", "MEETINGS", "SPA & WELLNESS", "CONTACT"].map((item) => (
          <li key={item}>
            <Link 
              to={`/${item.toLowerCase().replace(/ & /g, "-")}`} 
              style={styles.link}
              onMouseOver={(e) => e.target.style.opacity = "0.7"}
              onMouseOut={(e) => e.target.style.opacity = "1"}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;