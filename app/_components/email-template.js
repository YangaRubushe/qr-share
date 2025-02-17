import * as React from 'react';
import {
    Body,
    Button,
    Container,
    Column,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Row,
    Section,
    Text,
  } from '@react-email/components';

export const EmailTemplate = ({
  responce,
}) => (
    <div> 
    <Html>
    <Head />
    <Preview>File Shared with You via QR-IT</Preview>
    <Body style={main}>
      <Container>
      
        <Section style={content}>
          <Img 
            width={620} 
            src='/logoipsum-280.svg'
            alt="QR-IT Logo"
          />

          <Row style={{  paddingBottom: '0' }}>
            <Column>
              <Heading
                style={{
                  fontSize: 32,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Hi {responce?.emailToSend?.split("@")[0]},
              </Heading>
              <Heading
                as="h2"
                style={{
                  fontSize: 26,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {responce?.userName} has shared a file with you via QR-IT!
              </Heading>

              <Text style={paragraph}>
                <b>File Name: {responce.fileName}</b>
              </Text>
              <Text style={{  marginTop: -5 }}>
                <b>File Size: {(responce.fileSize / 1024 / 1024).toFixed(2)} MB</b>
              </Text>
              <Text style={{  marginTop: -5 }}>
                <b>File Type: {responce.fileType}</b>
              </Text>
              <Text
                style={{
                  color: 'rgb(0,0,0, 0.5)',
                  fontSize: 14,
                  marginTop: -5,
                }}
              >
                *Access and download at your own risk.
              </Text>

              <Text style={paragraph}>
                You can easily share your files using the QR-IT File Sharing app.
              </Text>
              <Text style={{  marginTop: -5 }}>
                Click the button below to access your file.
              </Text>
            </Column>
          </Row>
         
          <Row style={'style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px'}>
            <Column style={containerButton} colSpan={2}>
              <Button style={button} href={responce?.shortUrl}>
                Download File
              </Button>
            </Column>
          </Row>
         
        </Section>
        

        <Section style={containerImageFooter}>
          <Img 
            width={620} 
            src={`https://react-email-demo-3kjjfblod-resend.vercel.app/static/yelp-footer.png`} 
            alt="QR-IT Footer Image"
          />
        </Section>

        <Text
          style={{
            textAlign: 'center',
            fontSize: 12,
            color: 'rgb(0,0,0, 0.7)',
          }}
        >
          © 2024 | QR-IT File Sharing | www.qr-it.com
        </Text>
      </Container>
    </Body>
  </Html>
  </div>
);

const main = {
    backgroundColor: '#fff',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const paragraph = {
    fontSize: 16,
  };
  
  const containerButton = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  };
  
  const button = {
    backgroundColor: '#007BFF',
    padding: '12px 30px',
    borderRadius: 3,
    color: '#FFF',
    fontWeight: 'bold',
    border: '1px solid rgb(0,0,0, 0.1)',
    cursor: 'pointer',
  };
  
  const content = {
    border: '1px solid rgb(0,0,0, 0.1)',
    borderRadius: '3px',
    overflow: 'hidden',
    padding: '20px',
  };
  
  const containerImageFooter = {
    padding: '45px 0 0 0',
  };
