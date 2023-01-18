1. First, generate a key file used for self-signed certificate generation with the command below. The command will create a private key as a file called key.pem.

openssl genrsa -out key.pem

2. Next, generate a certificate service request (CSR) with the command below. You’ll need a CSR to provide all of the input necessary to create the actual certificate.

openssl req -new -key key.pem -out csr.pem

3. Finally, generate your certificate by providing the private key created to sign it with the public key created in step two with an expiry date of 9,999 days. This command below will create a certificate called cert.pem.

openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem