// src/app/api/health/classify/route.ts

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const backendRes = await fetch("http://localhost:5000/predict", {
      method: "POST",
      body: formData,
    });

    const data = await backendRes.json();

    return new Response(JSON.stringify(data), {
      status: backendRes.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to connect to AI backend" }),
      { status: 500 }
    );
  }
}
