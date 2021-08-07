import React from "react";

class Layout extends React.Component {

  render() {
    return (
      <React.Fragment >
        <div className="row">
          <h1 className="title">Auto References App </h1>
        </div>
        <main>
          {this.props.children}
        </main>
        <footer className="page-footer">
          <div className="footer-copyright">
            <a className="grey-text text-lighten-4 left" href="https://github.com/jadry92/Auto-references/blob/master/LICENSE">MIT
              License</a>
            <a className="grey-text text-lighten-4 right" href="https://github.com/jadry92/Auto-references">Github
              Rep</a>
          </div>
        </footer>
      </React.Fragment >
    )
  }
}

export default Layout;