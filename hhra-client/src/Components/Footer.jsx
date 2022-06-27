import React from 'react';


const Footer = () => {
  return (
    <div className="container">
      <div style={{ 'textAlign': 'left' }}>
        <div className="col-md-12 col-xs-12 text-center" style={{ 'borderTop': '1px solid#888', 'margin': '35px 0px 0px 0px' }}>
          <p style={{ 'margin': '20px 0px' }}><b>Project Galvanize Healthy Living</b></p>
        </div>

        <div className="row">
          <div className="col text-left">
            <p>Copyright &copy; 2020 GHL - All Rights Reserved, Twinepidemic.</p>
          </div>
          <div className="col" style={{ 'textAlign': 'right' }}>
            <p>POWERED by Science</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
