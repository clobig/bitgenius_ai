import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { method, duration, ...otherParams } = body

    // Handle different method types
    switch (method) {
      case "invoice":
        return handleInvoice(body)
      case "sendcode":
        return handleSendCode(body)
      case "lightning":
        return handleLightning(body)
      case "voice":
        return handleVoice(body)
      default:
        return NextResponse.json(
          { error: "Invalid method. Supported methods: invoice, sendcode, lightning, voice" },
          { status: 400 },
        )
    }
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function handleInvoice(data: any) {
  // Process invoice method
  console.log("Processing invoice:", data)

  return NextResponse.json({
    success: true,
    method: "invoice",
    message: "Invoice processed successfully",
    data: {
      invoiceId: `inv_${Date.now()}`,
      duration: data.duration,
      timestamp: new Date().toISOString(),
    },
  })
}

async function handleSendCode(data: any) {
  // Process sendcode method
  console.log("Processing sendcode:", data)

  return NextResponse.json({
    success: true,
    method: "sendcode",
    message: "Private code sent successfully",
    data: {
      codeId: `code_${Date.now()}`,
      duration: data.duration,
      timestamp: new Date().toISOString(),
    },
  })
}

async function handleLightning(data: any) {
  // Process lightning method
  console.log("Processing lightning:", data)

  return NextResponse.json({
    success: true,
    method: "lightning",
    message: "Lightning payment processed",
    data: {
      paymentId: `ln_${Date.now()}`,
      duration: data.duration,
      timestamp: new Date().toISOString(),
    },
  })
}

async function handleVoice(data: any) {
  // Process voice method
  console.log("Processing voice:", data)

  return NextResponse.json({
    success: true,
    method: "voice",
    message: "Voice command processed",
    data: {
      voiceId: `voice_${Date.now()}`,
      duration: data.duration,
      timestamp: new Date().toISOString(),
    },
  })
}

export async function GET() {
  return NextResponse.json({
    message: "Bit-Genius API",
    supportedMethods: ["invoice", "sendcode", "lightning", "voice"],
    version: "1.0.0",
  })
}
