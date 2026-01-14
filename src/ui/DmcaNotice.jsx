import { Wrapper, Title, Section, Heading, Text, Email } from './LegalLayout';

function DmcaNotice() {
  return (
    <Wrapper>
      <Title>DMCA Notice</Title>

      <Section>
        <Text>
          We respect the intellectual property rights of others and expect users
          to do the same.
        </Text>
      </Section>

      <Section>
        <Heading>Copyright Concerns</Heading>
        <Text>
          If you believe content hosted on our platform infringes your
          copyright, please contact us before submitting a formal DMCA notice.
        </Text>
      </Section>

      <Section>
        <Heading>Contact</Heading>
        <Text>
          Email us at{' '}
          <Email href='mailto:isekaihaven26@gmail.com'>
            isekaihaven26@gmail.com
          </Email>
        </Text>
      </Section>
    </Wrapper>
  );
}

export default DmcaNotice;
