import React from 'react';
import QRCode from 'qrcode.react';
import {Col, Row} from "react-bootstrap";


const QR = () =>{
    const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://cs-automation-ui-4f36a195004b.herokuapp.com': 'http://localhost:3000';

    console.log(baseUrl)
    // Append the specific route to the base URL
    const fullPath = `${baseUrl}/mobile`;

    return (
        <div>
            <Row>
                <Col>
                    <h1>Scan this QR code to see more Posts!</h1>
                </Col>
                <Col>
                    <QRCode value={fullPath} />
                </Col>
            </Row>


        </div>
    );
}

export default QR;