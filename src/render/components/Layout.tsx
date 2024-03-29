import React from 'react';

interface IProps {
  children: React.ReactNode;
}

function Layout({ children }: IProps): JSX.Element {
  return (
    <React.Fragment>
      {children}
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

export default Layout;
