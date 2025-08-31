import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface AccountApprovalEmailProps {
  firstName: string;
  loginUrl: string;
}

export default function AccountApprovalEmail({
  firstName,
  loginUrl,
}: AccountApprovalEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your PMB Aero Club account has been approved!</Preview>
      <Body
        style={{
          backgroundColor: "#ffffff",
          fontFamily: "Arial, sans-serif",
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "32px 16px",
          }}
        >
          <Section
            style={{
              background: "linear-gradient(135deg, #1a1a1a 0%, #262626 100%)",
              borderRadius: "8px",
              padding: "32px",
              textAlign: "center",
              marginBottom: "24px",
            }}
          >
            <Heading
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#ffffff",
                marginBottom: "16px",
                margin: "0 0 16px 0",
              }}
            >
              🎉 Account Approved!
            </Heading>
            <Text
              style={{
                fontSize: "20px",
                color: "#d1d5db",
                marginBottom: "24px",
                margin: "0 0 24px 0",
              }}
            >
              Welcome to PMB Aero Club, {firstName}!
            </Text>
          </Section>

          <Section
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              padding: "32px",
              marginTop: "24px",
              border: "1px solid #e5e7eb",
            }}
          >
            <Text
              style={{
                fontSize: "18px",
                color: "#1f2937",
                marginBottom: "16px",
                margin: "0 0 16px 0",
              }}
            >
              Great news! Your account has been reviewed and approved by our
              administration team.
            </Text>

            <Text
              style={{
                color: "#6b7280",
                marginBottom: "24px",
                margin: "0 0 24px 0",
              }}
            >
              You can now access all the features and services available to PMB
              Aero Club members.
            </Text>

            <Section style={{ textAlign: "center" }}>
              <Button
                href={loginUrl}
                style={{
                  backgroundColor: "#f6d57f",
                  color: "#262626",
                  padding: "12px 32px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  fontSize: "18px",
                  textDecoration: "none",
                  display: "inline-block",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Sign In to Your Account
              </Button>
            </Section>

            <Text
              style={{
                fontSize: "14px",
                color: "#6b7280",
                marginTop: "24px",
                textAlign: "center",
                margin: "24px 0 0 0",
              }}
            >
              If you have any questions, please contact our support team.
            </Text>
          </Section>

          <Section style={{ textAlign: "center", marginTop: "24px" }}>
            <Text
              style={{
                fontSize: "14px",
                color: "#6b7280",
                margin: 0,
              }}
            >
              © 2025 PMB Aero Club. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
