import React from 'react';

export const OrderMailTemplate = () => {
  return (
    <div style={{ padding: '50px 15vw' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <div style={{ marginBottom: '10px' }}><b>Company Name:</b> Priyatam Vinnakota</div>
          <div><b>Email:</b> vinnakota4201@gmail.com</div>
        </div>

        <img style={{ width: '100px', height: '100px' }} href='https://aic-enterprises.el.r.appspot.com/images/aic_logo.png' alt=''/>
      </div>

      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 5px' }}>
        <thead>
          <tr style={{ backgroundColor: '#232162', color: '#FFF' }}>
            <th style={{ padding: '20px 30px', textAlign: 'left' }}>Code</th>
            <th style={{ padding: '20px 30px', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '20px 30px', textAlign: 'left' }}>Brand</th>
            <th style={{ padding: '20px 30px', textAlign: 'left' }}>Quantity</th>
          </tr>
        </thead>

        <tbody>
          <tr style={{ boxShadow: '0 0 10px 1px rgba(188,188,188,0.3)' }}>
            <td style={{ padding: '20px 30px' }}>12243131</td>
            <td style={{ padding: '20px 30px' }}>some name some name some name some name</td>
            <td style={{ padding: '20px 30px' }}>some brand</td>
            <td style={{ padding: '20px 30px' }}>5</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
