/* eslint-disable react/no-unknown-property */
import React, { FormEvent, useState } from 'react';
import { Modal, Button, Input, message } from 'antd';
import { useIntl } from 'react-intl';

const { TextArea } = Input;

const feedbackOptions = [
  { label: 'Hate', emoji: '😡' },
  { label: 'Dislike', emoji: '👎' },
  { label: 'Neutral', emoji: '😐' },
  { label: 'Like', emoji: '👍' },
  { label: 'Love', emoji: '❤️' },
];

const FeedbackForm = () => {
  const intl = useIntl();
  const [comment, setComment] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<string>();
  const [messageApi, contextHolder] = message.useMessage();

  const handleFeedbackClick = (selectedFeedback: string) => {
    setFeedback(selectedFeedback);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setFeedback(undefined);
    setComment('');
    messageApi.success({
      content: intl.formatMessage({
        defaultMessage: '¡Gracias por tu feedback!',
        id: '09Ngfu',
      }),
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFeedback(undefined);
    setComment('');
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('form-name', 'feedback');
    formData.append('feedback', feedback ?? '');
    formData.append('comment', comment ?? '');

    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as any).toString(),
    });
    handleOk();
  };

  const handleCommentChange = (event: any) => {
    setComment(event?.target?.value);
  };

  return (
    <>
      <div className="fixed right-1/2 -bottom-4 transform z-10 origin-bottom translate-x-1/2 hover:-translate-y-2 transition">
        <Button
          onClick={showModal}
          type="primary"
          className="rounded-bl-none rounded-br-none bg-black h-8"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm">
              {intl.formatMessage({
                defaultMessage: 'Feedback',
                id: 'Ejhdi4',
              })}
            </span>
          </div>
        </Button>
        <div className="h-4 bg-black" />
      </div>

      <Modal
        title={intl.formatMessage({
          defaultMessage: 'How would you rate your experience?',
          id: 'jTixpa',
        })}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText={intl.formatMessage({
          defaultMessage: 'Submit',
          id: 'wSZR47',
        })}
        cancelText={intl.formatMessage({
          defaultMessage: 'Cancel',
          id: '47FYwb',
        })}
        cancelButtonProps={{
          htmlType: 'button',
        }}
        okButtonProps={{
          disabled: !feedback || !comment,
          className: 'bg-black disabled:bg-gray-300',
          htmlType: 'submit',
        }}
      >
        <form
          name="feedback"
          method="post"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="feedback" />
          <div className="feedback-form__rating flex justify-between gap-2">
            {feedbackOptions.map((option) => (
              <button
                type="button"
                key={option.label}
                className={`rounded-lg p-2 w-full h-16 group ${
                  feedback === option.label ? 'bg-gray-300' : 'bg-gray-50'
                }`}
                onClick={() => handleFeedbackClick(option.label)}
              >
                <span
                  role="img"
                  aria-label={option.label}
                  className="text-lg group-hover:scale-150"
                >
                  {option.emoji}
                </span>
                <div
                  className={`text-xs mt-1 group-hover:opacity-100 transition text-gray-500 ${
                    feedback === option.label
                      ? 'text-black opacity-100'
                      : 'opacity-30'
                  }`}
                >
                  {option.label}
                </div>
              </button>
            ))}
          </div>
          {feedback && (
            <div className="feedback-form__comment">
              <TextArea
                autoFocus
                className="w-full h-32 mt-4 p-2 border border-gray-300 rounded-lg"
                value={comment}
                onChange={handleCommentChange}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Tell us about your experience',
                  id: 'xZabQg',
                })}
              />
            </div>
          )}
        </form>
      </Modal>
      {contextHolder}
    </>
  );
};

export default FeedbackForm;
