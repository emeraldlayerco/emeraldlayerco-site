import nodemailer from "nodemailer";

interface ProjectRequest {
  projectId: string;

  name: string;
  email: string;
  phone: string;
  business: string;

  projectName: string;
  description: string;

  material: string;
  quantity: string;
  neededBy: string;

  notes: string;
}

const EMAIL_USER = import.meta.env.EMAIL_USER;
const EMAIL_PASS = import.meta.env.EMAIL_PASS;
const COMPANY_EMAIL = import.meta.env.COMPANY_EMAIL;

if (!EMAIL_USER || !EMAIL_PASS || !COMPANY_EMAIL) {
  throw new Error(
    "Missing EMAIL_USER, EMAIL_PASS, or COMPANY_EMAIL in your .env file."
  );
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export async function sendProjectRequestEmail(data: ProjectRequest) {
  const html = `
  <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;line-height:1.6;">

    <h1 style="color:#059669;margin-bottom:0;">
      New Project Request
    </h1>

    <p><strong>Project ID:</strong> ${data.projectId}</p>

    <hr>

    <h2>Customer Information</h2>

    <table cellpadding="8" cellspacing="0">

      <tr>
        <td><strong>Name</strong></td>
        <td>${data.name}</td>
      </tr>

      <tr>
        <td><strong>Email</strong></td>
        <td>${data.email}</td>
      </tr>

      <tr>
        <td><strong>Phone</strong></td>
        <td>${data.phone || "-"}</td>
      </tr>

      <tr>
        <td><strong>Business</strong></td>
        <td>${data.business || "-"}</td>
      </tr>

    </table>

    <hr>

    <h2>Project Information</h2>

    <table cellpadding="8" cellspacing="0">

      <tr>
        <td><strong>Project Name</strong></td>
        <td>${data.projectName}</td>
      </tr>

      <tr>
        <td><strong>Material</strong></td>
        <td>${data.material}</td>
      </tr>

      <tr>
        <td><strong>Quantity</strong></td>
        <td>${data.quantity}</td>
      </tr>

      <tr>
        <td><strong>Needed By</strong></td>
        <td>${data.neededBy || "-"}</td>
      </tr>

    </table>

    <hr>

    <h2>Project Description</h2>

    <p>${data.description.replace(/\n/g, "<br>")}</p>

    <hr>

    <h2>Additional Notes / Desired Colors</h2>

    <p>${data.notes ? data.notes.replace(/\n/g, "<br>") : "-"}</p>

  </div>
  `;

  await transporter.sendMail({
    from: `"Emerald Layer Company Website" <${EMAIL_USER}>`,
    to: COMPANY_EMAIL,
    replyTo: data.email,
    subject: `New Project Request - ${data.projectId}`,
    html,
  });
}