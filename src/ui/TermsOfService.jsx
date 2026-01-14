import { Wrapper, Title, Section, Heading, Text, List } from './LegalLayout';

function TermsOfService() {
  return (
    <>
      <Wrapper>
        <Title>Terms of Service</Title>
        <Section>
          <Text>
            By accessing or using this website, you agree to be bound by these
            terms.
          </Text>
        </Section>

        <Section>
          <Heading>User Responsibilities</Heading>
          <List>
            <li>You must not misuse the platform.</li>
            <li>You are responsible for your account activity.</li>
            <li>You must comply with applicable laws.</li>
          </List>
        </Section>

        <Section>
          <Heading>Content Disclaimer</Heading>
          <Text>
            Content is provided for informational purposes only and may change
            without notice.
          </Text>
        </Section>

        <Section>
          <Heading>Termination</Heading>
          <Text>
            We reserve the right to suspend or terminate accounts that violate
            these terms.
          </Text>
        </Section>
      </Wrapper>
    </>
  );
}

export default TermsOfService;
