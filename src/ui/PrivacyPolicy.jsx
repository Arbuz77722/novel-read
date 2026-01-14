import { Wrapper, Title, Section, Heading, Text } from './LegalLayout';

function PrivacyPolicy() {
  return (
    <Wrapper>
      <Title>Privacy Policy</Title>

      <Section>
        <Text>
          We respect your privacy and are committed to protecting your personal
          information.
        </Text>
      </Section>

      <Section>
        <Heading>Information We Collect</Heading>
        <Text>
          We collect only the information necessary to provide and improve our
          services, such as account details and usage data.
        </Text>
      </Section>

      <Section>
        <Heading>How We Use Information</Heading>
        <Text>
          Information is used to maintain accounts, improve user experience, and
          ensure platform security.
        </Text>
      </Section>

      <Section>
        <Heading>Third-Party Services</Heading>
        <Text>
          We may use third-party services (such as analytics or hosting
          providers) that follow their own privacy policies.
        </Text>
      </Section>
    </Wrapper>
  );
}

export default PrivacyPolicy;
