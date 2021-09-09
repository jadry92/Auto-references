import React from 'react';

class Layout extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.children}
        <footer className="page-footer">
          <div className="footer-copyright">
            <a
              className="grey-text text-lighten-4 left"
              href="https://github.com/jadry92/Auto-references/blob/master/LICENSE"
            >
              MIT License
            </a>
            <a
              className="grey-text text-lighten-4 right"
              href="https://github.com/jadry92/Auto-references"
            >
              Github Rep
            </a>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default Layout;
