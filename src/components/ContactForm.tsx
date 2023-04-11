/* eslint-disable jsx-a11y/label-has-associated-control */
import { Input, Button, message } from 'antd';
import React, { useState, FormEvent } from 'react';
import { useIntl } from 'react-intl';

function ContactForm() {
  const intl = useIntl();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [org, setOrg] = useState('');
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
      .catch(console.error);
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
      <div className="mb-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <label className="w-full">
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
          <label className="w-full">
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
        </div>
      </div>
      <div className="mb-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <label className="w-full">
            <Input
              onChange={(event) => setCity(event.target.value)}
              value={city}
              type="text"
              name="city"
              placeholder={intl.formatMessage({
                defaultMessage: 'City',
                id: 'TE4fIS',
              })}
            />
          </label>

          <label className="w-full">
            <Input
              onChange={(event) => setOrg(event.target.value)}
              value={org}
              type="text"
              name="organization"
              placeholder={intl.formatMessage({
                defaultMessage: 'Organization',
                id: 'K56Dim',
              })}
            />
          </label>
        </div>
      </div>
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
