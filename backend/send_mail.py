### send_mail.py

import smtplib, ssl

from passwords import email_password

port = 465
smtp_server = "smtp.gmail.com"
sender_email = "reoccupy9953@gmail.com"
receiver_email = "reoccupy9953@gmail.com"
message = """\
Subject: Hi there

This message is sent from Python."""

context = ssl.create_default_context()
with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
    server.login(sender_email, email_password)
    server.sendmail(sender_email, receiver_email, message)
