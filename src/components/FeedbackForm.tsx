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

  const encode = (data: Record<string, string>) => {
    return Object.keys(data)
      .map(
        (key: string) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join('&');
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (feedback && comment) {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'feedback',
          feedback,
          comment,
        }),
      });
      handleOk();
    }
  };

  const handleCommentChange = (event: any) => {
    setComment(event?.target?.value);
  };

  return (
    <>
      <div className="fixed top-1/2 right-0 transform -rotate-90 z-10 origin-bottom translate-x-1/2">
        <Button
          onClick={showModal}
          type="primary"
          className="rounded-bl-none rounded-br-none bg-black"
        >
          {intl.formatMessage({
            defaultMessage: 'Feedback',
            id: 'Ejhdi4',
          })}
        </Button>
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
        okButtonProps={{
          disabled: !feedback || !comment,
          className: 'bg-black disabled:bg-gray-300',
        }}
      >
        <form
          name="feedback"
          method="POST"
          data-netlify="true"
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
