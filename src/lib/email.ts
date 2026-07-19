import { Resend } from "resend";

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

// Debug to verify Cloudflare can see the secret
const apiKey = import.meta.env.RESEND_API_KEY;

console.log("=================================");
console.log("RESEND_API_KEY exists:", !!apiKey);
console.log("API Key length:", apiKey ? apiKey.length : 0);
console.log("=================================");

if (!apiKey) {
  throw new Error("RESEND_API_KEY is missing!");
}

const resend = new Resend(apiKey);

const COMPANY_EMAIL = "justin@emeraldlayer.com";

export async function sendProjectRequestEmail(data: ProjectRequest) {
  const html = `
  <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;line-height:1.6;">

    <h1 style="color:#059669;">New Project Request</h1>

    <p><strong>Project ID:</strong> ${data.projectId}</p>

    <hr>

    <h2>Customer Information</h2>

    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone || "-"}</p>
    <p><strong>Business:</strong> ${data.business || "-"}</p>

    <hr>

    <h2>Project Information</h2>

    <p><strong>Project Name:</strong> ${data.projectName}</p>
    <p><strong>Material:</strong> ${data.material}</p>
    <p><strong>Quantity:</strong> ${data.quantity}</p>
    <p><strong>Needed By:</strong> ${data.neededBy || "-"}</p>

    <hr>

    <h2>Description</h2>

    <p>${data.description.replace(/\n/g, "<br>")}</p>

    <hr>

    <h2>Additional Notes</h2>

    <p>${data.notes ? data.notes.replace(/\n/g, "<br>") : "-"}</p>

  </div>
  `;

  const result = await resend.emails.send({
    from: "Emerald Layer Company <quotes@emeraldlayer.com>",
    to: COMPANY_EMAIL,
    replyTo: data.email,
    subject: `New Project Request - ${data.projectId}`,
    html,
  });

  console.log("Resend response:", result);

  return result;
}