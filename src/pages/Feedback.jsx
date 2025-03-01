import { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #1E3D59;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3),
               0 0 10px rgba(255, 255, 255, 0.5),
               0 0 20px rgba(255, 255, 255, 0.3);
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  height: fit-content;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #1A1B2F;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 2px solid rgba(41, 41, 41, 0.2);
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  background: rgba(255, 255, 255, 0.9);

  &:focus {
    outline: none;
    border-color: #2A9D8F;
    background: rgba(255, 255, 255, 0.95);
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 2px solid rgba(41, 41, 41, 0.2);
  border-radius: 4px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s ease;
  background: rgba(255, 255, 255, 0.9);

  &:focus {
    outline: none;
    border-color: #2A9D8F;
    background: rgba(255, 255, 255, 0.95);
  }
`;

const Button = styled.button`
  background: #2A9D8F;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #1A1B2F;
  }

  &:disabled {
    background: rgba(204, 204, 204, 0.8);
    cursor: not-allowed;
  }
`;

const Message = styled(motion.div)`
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  background: ${props => props.type === 'success' ? '#2A9D8F' : '#E76F51'};
  color: white;
  text-align: center;
`;

const FeedbackList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: calc((150px + 1rem) * 4); /* Height for 4 cards plus gaps */
  overflow-y: auto;
  padding-right: 1rem;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #2A9D8F;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #1A1B2F;
  }
`;

const FeedbackCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.8);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
`;

const FeedbackHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 0.5rem;
`;

const FeedbackName = styled.h3`
  color: #1A1B2F;
  margin: 0;
  font-size: 1.1rem;
`;

const FeedbackTime = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const FeedbackSubject = styled.h4`
  color: #2A9D8F;
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
`;

const FeedbackMessage = styled.p`
  color: #333;
  margin: 0;
  line-height: 1.5;
`;

const ErrorText = styled.span`
  color: #E76F51;
  font-size: 0.9rem;
  font-weight: 500;
`;

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Add new feedback to the list
    try {
      const newFeedback = {
        ...formData,
        timestamp: new Date().toISOString(),
        id: Date.now()
      };
      
      setFeedbacks(prev => [newFeedback, ...prev]);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageContainer>
        <Title>Feedback</Title>
        <ContentLayout>
          <FormContainer>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
                {errors.name && <ErrorText>{errors.name}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                />
                {errors.email && <ErrorText>{errors.email}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                />
                {errors.subject && <ErrorText>{errors.subject}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="message">Message</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                />
                {errors.message && <ErrorText>{errors.message}</ErrorText>}
              </FormGroup>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </Form>

            {submitStatus && (
              <Message
                type={submitStatus}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {submitStatus === 'success' 
                  ? 'Thank you for your feedback! We will get back to you soon.'
                  : 'Something went wrong. Please try again later.'}
              </Message>
            )}
          </FormContainer>

          <FeedbackList>
            {feedbacks.map((feedback) => (
              <FeedbackCard
                key={feedback.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <FeedbackHeader>
                  <FeedbackName>{feedback.name}</FeedbackName>
                  <FeedbackTime>
                    {new Date(feedback.timestamp).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </FeedbackTime>
                </FeedbackHeader>
                <FeedbackSubject>{feedback.subject}</FeedbackSubject>
                <FeedbackMessage>{feedback.message}</FeedbackMessage>
              </FeedbackCard>
            ))}
          </FeedbackList>
        </ContentLayout>
      </PageContainer>
    </motion.div>
  );
}

export default Feedback;
