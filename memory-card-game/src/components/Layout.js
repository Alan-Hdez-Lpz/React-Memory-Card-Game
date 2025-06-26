import '../styles.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header>
        <h1>Memory Game</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Memory Game</p>
      </footer>
    </div>
  );
};

export default Layout;
