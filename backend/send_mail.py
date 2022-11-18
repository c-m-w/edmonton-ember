### send_mail.py

import smtplib, ssl

from passwords import email_password

def send_mail(to, message_string):

    context = ssl.create_default_context()

    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:

        server.login("reoccupy9953@gmail.com", email_password)
        server.sendmail("reoccupy9953@gmail.com", to, message_string)
