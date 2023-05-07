import React from "react";
import classes from "./footer.module.css";

const Footer = () => {
  const date = new Date();
  return (
    <footer className={classes.footerContent}>
      <div>
        <h3>© {date.getFullYear()} Kanban Board.</h3>
        <p>
          Developed by:{" "}
         
           Galya Matviienko
          
        </p>
      </div>
    </footer>
  );
};

export default Footer;
