import React from 'react';
import jsPDF from 'jspdf';
import Download from '../../Static/Assets/my project icon (5).png';
import Logo from '../Navbar/images/logo.png';

function QRCodeGenerator({qrvalue,w,NameofClass,pdfname,added_by,phone}) {
    const QRCode = require('qrcode.react');
    // QR Code download
    const downloadQR = () => {
    const canvas = document.getElementById("QRGenerator");
    const pngUrl = canvas.toDataURL('image/png');
    //convert png image to pdf
    const pdf = new jsPDF();
    pdf.setFontSize(25);
    pdf.setFont("bold");
    var xOffset = (pdf.internal.pageSize.width / 2) - (pdf.getStringUnitWidth(pdfname))+10;
    // pdf.text(pdfname,xOffset, 20, 'center')
    // pdf.addImage(pngUrl, 'JPEG', 15, 40);
    // pdf.save(pdfname+".pdf");
    const imgProps= pdf.getImageProperties(pngUrl);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.text(pdfname,xOffset, 20, 'center')
    pdf.addImage(pngUrl, 'JPEG', 0, 30, pdfWidth, pdfHeight);
    // pdf.text(20,280,added_by)
    pdf.setFontSize(20);
    pdf.text(20,250, "Contact details of project owner");
    pdf.setFontSize(15);
    pdf.text(20,260,'Name               : '+added_by)
    pdf.setFontSize(15);
    pdf.text(20,270,'Phone number : '+phone)
    pdf.save(pdfname+".pdf");
  };
  return (
    <div>
      <img alt="download qr code" className={NameofClass} width={w} rounded="true" src={Download} onClick={downloadQR} title="Download Project QR Code"/>
        {/* <p onClick={downloadQR}> Download QR code</p> */}
      <QRCode
      id="QRGenerator"
      imageSettings={{
        src: Logo,
        x: null,
        y: null,
        height: 100,
        width: 100,
        excavate: true,
      }}
      value={qrvalue}
    size={690}
    level={"H"}
    includeMargin={true}
    className="text-center"
    style={{display:'none'}}
  />
  </div>
  );
}

export default QRCodeGenerator;
