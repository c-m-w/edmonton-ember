### send_mail.py

import smtplib, ssl

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from passwords import email_password

def send_mail(to, subject, message_html):

    context = ssl.create_default_context()

    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:

        server.login("reoccupy9953@gmail.com", email_password)

        message = MIMEMultipart("alternative")
        
        message["Subject"] = subject
        message["From"] = "reoccupy9953@gmail.com"
        message["To"] = to

        message.attach(MIMEText(message_html, "html"))

        server.sendmail("reoccupy9953@gmail.com", to, message.as_string())
