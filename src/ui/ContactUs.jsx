import { Wrapper, Title, Section, Text, Email } from './LegalLayout';

function ContactUs() {
  return (
    <Wrapper>
      <Title>Contact Us</Title>

      <Section>
        <Text>
          For any questions, feedback, or concerns, feel free to reach out to
          us.
        </Text>
      </Section>

      <Section>
        <Text>
          Email:{' '}
          <Email href='mailto:isekaihaven26@gmail.com'>
            isekaihaven26@gmail.com
          </Email>
        </Text>
      </Section>
    </Wrapper>
  );
}

export default ContactUs;
