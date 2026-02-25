import { Options } from './components/Options';
import { PropertyDocumentation } from './components/PropertyDocumentation';

  export default function App() {
  return (
    <section className="hero is-danger is-fullheight theme-light">
      <header className="hero-head">
        <nav className="navbar">
          <div className="navbar-inner">
            <a
              className="navbar-brand"
              href="https://github.com/headmandev/react-modal-view"
              target="_blank"
              rel="noreferrer"
            >
              <span className="icon" aria-hidden>📦</span>
            </a>
          </div>
        </nav>
      </header>
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="fixed">
                <h1 className="title mb-2">REACT-SIDE-PANEL</h1>
                <p className="subtitle">
                🔥 Easy to use and flexible
                  <br />
                  screen-side modal component
                </p>
                <code className="language-html p-2">npm i react-side-panel</code>
              </div>
            </div>
            <div className="column is-three-quarters">
              <Options />
              <PropertyDocumentation />
              <p className="github-link">
                <a href="https://github.com/headmandev" target="_blank" rel="noreferrer">
                  👉 Github
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
