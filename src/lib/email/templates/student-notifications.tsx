import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Link,
  Preview,
  Section,
  Button,
  Hr,
  Heading,
} from "@react-email/components";

interface StudentNotificationProps {
  studentName: string;
  reason?: string;
  adminName?: string;
}

export function StudentApprovalEmail({
  studentName,
  adminName = "Admin",
}: StudentNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>Your PMB Aero Club application has been approved!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>🎉 Application Approved!</Heading>
            <Text style={text}>
              Congratulations {studentName}! Your application to PMB Aero Club
              has been approved.
            </Text>
          </Section>

          <Section style={content}>
            <Text style={text}>
              Welcome to PMB Aero Club! Your application has been reviewed and
              approved by {adminName}. You can now access all student features
              and begin your flight training journey.
            </Text>

            <Text style={text}>
              <strong>Next Steps:</strong>
            </Text>
            <ul style={list}>
              <li style={listItem}>Complete your student profile</li>
              <li style={listItem}>Upload required documents</li>
              <li style={listItem}>Schedule your first flight lesson</li>
              <li style={listItem}>Review training materials</li>
            </ul>

            <Button
              style={button}
              href="https://pmbaeroclub.com/seams/students/dashboard"
            >
              Access Your Dashboard
            </Button>
          </Section>

          <Hr style={hr} />

          <Section style={footer}>
            <Text style={footerText}>
              If you have any questions, please contact us at{" "}
              <Link href="mailto:support@pmbaeroclub.com" style={link}>
                support@pmbaeroclub.com
              </Link>
            </Text>
            <Text style={footerText}>
              PMB Aero Club - Empowering Future Pilots
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export function StudentRejectionEmail({
  studentName,
  reason,
}: StudentNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>Update on your PMB Aero Club application</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>Application Status Update</Heading>
            <Text style={text}>Dear {studentName},</Text>
          </Section>

          <Section style={content}>
            <Text style={text}>
              Thank you for your interest in PMB Aero Club. After careful review
              of your application, we regret to inform you that your application
              has not been approved at this time.
            </Text>

            {reason && (
              <>
                <Text style={text}>
                  <strong>Reason for rejection:</strong>
                </Text>
                <Text style={reasonText}>{reason}</Text>
              </>
            )}

            <Text style={text}>
              <strong>What you can do:</strong>
            </Text>
            <ul style={list}>
              <li style={listItem}>Address the issues mentioned above</li>
              <li style={listItem}>Gather additional required documentation</li>
              <li style={listItem}>Reapply in the future when ready</li>
              <li style={listItem}>Contact us for clarification</li>
            </ul>

            <Button
              style={secondaryButton}
              href="https://pmbaeroclub.com/contact"
            >
              Contact Support
            </Button>
          </Section>

          <Hr style={hr} />

          <Section style={footer}>
            <Text style={footerText}>
              If you have any questions, please contact us at{" "}
              <Link href="mailto:support@pmbaeroclub.com" style={link}>
                support@pmbaeroclub.com
              </Link>
            </Text>
            <Text style={footerText}>
              PMB Aero Club - Empowering Future Pilots
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export function StudentPauseEmail({
  studentName,
  reason,
  adminName = "Admin",
}: StudentNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>Your PMB Aero Club account has been temporarily paused</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>⚠️ Account Temporarily Paused</Heading>
            <Text style={text}>Dear {studentName},</Text>
          </Section>

          <Section style={content}>
            <Text style={text}>
              Your PMB Aero Club account has been temporarily paused by{" "}
              {adminName}. During this time, you will not be able to access
              certain features or schedule flights.
            </Text>

            {reason && (
              <>
                <Text style={text}>
                  <strong>Reason for pause:</strong>
                </Text>
                <Text style={reasonText}>{reason}</Text>
              </>
            )}

            <Text style={text}>
              <strong>What happens next:</strong>
            </Text>
            <ul style={list}>
              <li style={listItem}>We will review your account</li>
              <li style={listItem}>
                You may be contacted for additional information
              </li>
              <li style={listItem}>
                Your account will be reactivated once issues are resolved
              </li>
            </ul>

            <Text style={text}>
              If you believe this pause was made in error or have questions,
              please contact us immediately.
            </Text>

            <Button
              style={secondaryButton}
              href="https://pmbaeroclub.com/contact"
            >
              Contact Support
            </Button>
          </Section>

          <Hr style={hr} />

          <Section style={footer}>
            <Text style={footerText}>
              If you have any questions, please contact us at{" "}
              <Link href="mailto:support@pmbaeroclub.com" style={link}>
                support@pmbaeroclub.com
              </Link>
            </Text>
            <Text style={footerText}>
              PMB Aero Club - Empowering Future Pilots
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export function StudentReactivationEmail({
  studentName,
  adminName = "Admin",
}: StudentNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>Your PMB Aero Club account has been reactivated!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>✅ Account Reactivated!</Heading>
            <Text style={text}>Dear {studentName},</Text>
          </Section>

          <Section style={content}>
            <Text style={text}>
              Great news! Your PMB Aero Club account has been reactivated by{" "}
              {adminName}. You now have full access to all student features and
              can resume your flight training.
            </Text>

            <Text style={text}>
              <strong>You can now:</strong>
            </Text>
            <ul style={list}>
              <li style={listItem}>Schedule flight lessons</li>
              <li style={listItem}>Access training materials</li>
              <li style={listItem}>View your progress</li>
              <li style={listItem}>Book aircraft</li>
            </ul>

            <Button
              style={button}
              href="https://pmbaeroclub.com/seams/students/dashboard"
            >
              Access Your Dashboard
            </Button>
          </Section>

          <Hr style={hr} />

          <Section style={footer}>
            <Text style={footerText}>
              If you have any questions, please contact us at{" "}
              <Link href="mailto:support@pmbaeroclub.com" style={link}>
                support@pmbaeroclub.com
              </Link>
            </Text>
            <Text style={footerText}>
              PMB Aero Club - Empowering Future Pilots
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const header = {
  textAlign: "center" as const,
  padding: "20px 0",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
};

const content = {
  padding: "20px 0",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
};

const reasonText = {
  color: "#666",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "8px 0",
  padding: "12px",
  backgroundColor: "#f5f5f5",
  borderRadius: "4px",
};

const list = {
  margin: "16px 0",
  padding: "0",
};

const listItem = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "8px 0",
  paddingLeft: "20px",
};

const button = {
  backgroundColor: "#0070f3",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
  margin: "20px 0",
};

const secondaryButton = {
  backgroundColor: "#666",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
  margin: "20px 0",
};

const hr = {
  borderColor: "#dfe1e4",
  margin: "42px 0 26px",
};

const footer = {
  textAlign: "center" as const,
  padding: "20px 0",
};

const footerText = {
  color: "#666",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "8px 0",
};

const link = {
  color: "#0070f3",
  textDecoration: "underline",
};
