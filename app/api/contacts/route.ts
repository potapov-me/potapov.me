import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { z } from "zod";
import { cookies } from "next/headers";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const submissionSchema = z.object({
  name: z.string().min(1, "Укажите имя"),
  email: z.string().email("Некорректный email"),
  message: z.string().min(5, "Слишком краткое сообщение"),
});

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(submissions);
  } catch (error) {
    console.error("Error fetching contact submissions:", error);
    return NextResponse.json(
      { message: "Error fetching contact submissions" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const parsed = submissionSchema.safeParse(data);
    console.log(parsed, data);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid data", errors: parsed.error.format() },
        { status: 400 }
      );
    }

    const created = await prisma.contactSubmission.create({
      data: parsed.data,
    });

    await transporter.sendMail({
      from: "info@iq.moscow",
      to: "constantin@potapov.me",
      subject: "Новая заявка с сайта",
      html: `<p>Имя: ${parsed.data.name}</p><p>Email: ${parsed.data.email}</p><p>Сообщение: ${parsed.data.message}</p>`,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Error creating contact submission:", error);
    return NextResponse.json(
      { message: "Error creating contact submission" },
      { status: 500 }
    );
  }
}
