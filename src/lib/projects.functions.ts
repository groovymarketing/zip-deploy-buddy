import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export type ProjectRow = {
  id: string;
  title: string;
  location: string | null;
  category: string | null;
  panorama_url: string;
  thumbnail_url: string | null;
  description: string | null;
  order: number | null;
};

export const listProjects = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("id,title,location,category,panorama_url,thumbnail_url,description,order")
    .order("order", { ascending: true });
  if (error) throw new Error(error.message);
  return { projects: (data ?? []) as ProjectRow[] };
});

export const getProject = createServerFn({ method: "GET" })
  .inputValidator((d) => z.object({ id: z.string().min(1).max(64) }).parse(d))
  .handler(async ({ data }) => {
    const { data: row, error } = await supabaseAdmin
      .from("projects")
      .select("id,title,location,category,panorama_url,thumbnail_url,description,order")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return { project: (row ?? null) as ProjectRow | null };
  });

const ContactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  subject: z.string().max(200).optional().default(""),
  plan: z.string().max(120).optional().default(""),
  message: z.string().min(1).max(5000),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((d) => ContactSchema.parse(d))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("contacts").insert({
      name: data.name,
      email: data.email,
      subject: data.subject || null,
      plan: data.plan || null,
      message: data.message,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ email: z.string().email().max(200) }).parse(d))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin
      .from("newsletter")
      .insert({ email: data.email });
    if (error && !error.message.includes("duplicate")) throw new Error(error.message);
    return { ok: true };
  });
