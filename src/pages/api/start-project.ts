export const prerender = false;

import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

import { generateProjectId } from "~/lib/projectId";
import { sendProjectRequestEmail } from "~/lib/email";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const projectId = generateProjectId();

    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const phone = String(formData.get("phone") ?? "");
    const business = String(formData.get("business") ?? "");

    const projectName = String(formData.get("projectName") ?? "");
    const description = String(formData.get("description") ?? "");

    const material = String(formData.get("material") ?? "");
    const quantity = String(formData.get("quantity") ?? "");
    const neededBy = String(formData.get("neededBy") ?? "");

    const notes = String(formData.get("notes") ?? "");

    await sendProjectRequestEmail(env.RESEND_API_KEY, {
      projectId,
      name,
      email,
      phone,
      business,
      projectName,
      description,
      material,
      quantity,
      neededBy,
      notes,
    });

    return new Response(
      JSON.stringify({
        success: true,
        projectId,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Project submission failed:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Unable to submit project.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};