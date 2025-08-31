import { resend } from "./resend";
import AccountApprovalEmail from "./templates/account-approval";

export async function sendApprovalEmail(
  to: string,
  firstName: string,
  loginUrl: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: "PMB Aero Club <noreply@pmbaeroclub.co.za>",
      to: [to],
      subject: "🎉 Your PMB Aero Club Account Has Been Approved!",
      react: AccountApprovalEmail({
        firstName,
        loginUrl,
      }) as React.ReactElement,
    });

    if (error) {
      console.error("Error sending approval email:", error);
      throw new Error(`Failed to send approval email: ${error.message}`);
    }

    console.log("Approval email sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Error sending approval email:", error);
    throw error;
  }
}
