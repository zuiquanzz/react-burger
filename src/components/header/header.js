import React from 'react';
import headerLogo from  "../../images/logo.svg"
import headerStyles from "./header.module.css"
class Header extends React.Component {
  render() {
    return (
        <header className={headerStyles.header}>
          <img className={headerStyles.logo} src={headerLogo} alt={"logo"}/>
          <h1 className={headerStyles.logo}>Собачки, следящие за тобой, пока ты изучаешь React</h1>
        </header>
    );
  }
}

export default Header;