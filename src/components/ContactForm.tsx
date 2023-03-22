/* eslint-disable jsx-a11y/label-has-associated-control */
import { Input, Button, message } from 'antd';
import React, { useState, FormEvent } from 'react';
import { useIntl } from 'react-intl';

function ContactForm() {
  const intl = useIntl();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    fetch('/en', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then(() => {
        form.reset();
        messageApi.success({
          content: intl.formatMessage({
            defaultMessage: '¡Gracias por tus comentarios!',
            id: 'zpoSLn',
          }),
        });
        setFeedback('');
        setName('');
        setEmail('');
      })
      .catch((error) => alert(error));
  };

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="mb-4">
        <label>
          <Input
            onChange={(event) => setName(event.target.value)}
            value={name}
            type="text"
            name="name"
            placeholder={intl.formatMessage({
              defaultMessage: 'Nombre',
              id: 'hCOqfl',
            })}
          />
        </label>
      </p>
      <p className="mb-4">
        <label>
          <Input
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            type="email"
            name="email"
            placeholder={intl.formatMessage({
              defaultMessage: 'Email',
              id: 'sy+pv5',
            })}
          />
        </label>
      </p>
      <p className="mb-4">
        <label>
          <Input.TextArea
            onChange={(event) => setFeedback(event.target.value)}
            value={feedback}
            name="message"
            placeholder={intl.formatMessage({
              defaultMessage: 'Sugerencias',
              id: '7kHB42',
            })}
          />
        </label>
      </p>
      <p>
        <Button
          htmlType="submit"
          type="primary"
          block
          size="large"
          className="bg-black"
        >
          {intl.formatMessage({
            defaultMessage: 'Send',
            id: '9WRlF4',
          })}
        </Button>
      </p>
      {contextHolder}
    </form>
  );
}

export default ContactForm;
