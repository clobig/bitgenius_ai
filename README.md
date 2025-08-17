# 🚀 BitGenius - AI Conversational Agent with Bitcoin Lightning

**Version 1.0.0** | Made by Clobig

BitGenius is an advanced AI conversational agent that integrates Bitcoin Lightning Network payments for seamless micropayment interactions. Built with Next.js and OpenAI, it enables pay-per-use AI conversations with instant Lightning payments.

## ✨ Features

- 🤖 **AI Conversations**: Powered by OpenAI models (GPT-3.5, GPT-4)
- ⚡ **Lightning Payments**: Instant Bitcoin micropayments for each interaction
- 🔒 **HTTP 402 Support**: Standard payment-required protocol implementation
- 🎛️ **Customizable Agents**: Clone and customize for different use cases
- 🔗 **Node Integration**: Connect your own Bitcoin/Lightning full node
- 📱 **Modern UI**: Clean, responsive interface with dark theme
- 🔐 **Secure**: End-to-end payment verification and secure API handling

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **AI**: OpenAI API (GPT models)
- **Payments**: Bitcoin Lightning Network
- **Database**: Compatible with any SQL/NoSQL database
- **Deployment**: Vercel, Docker, or self-hosted

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/pnpm
- Bitcoin Lightning node (LND, CLN, or Eclair)
- OpenAI API key

### Installation


# Clone the repository
```bash
git clone https://github.com/your-username/bitgenius.git
cd bitgenius
```

# Install dependencies
```bash
npm install
# or
pnpm install
```

# Copy environment variables
```bash
cp .env.example .env.local
```

### Environment Configuration

Create a `.env.local` file with the following variables:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4

# Lightning Network Configuration
LND_HOST=localhost:10009
LND_MACAROON_PATH=/path/to/admin.macaroon
LND_TLS_CERT_PATH=/path/to/tls.cert

# Alternative: Use hex-encoded credentials
LND_MACAROON_HEX=your_macaroon_hex_here
LND_TLS_CERT_HEX=your_tls_cert_hex_here

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
PAYMENT_AMOUNT_SATS=10
SESSION_SECRET=your_session_secret_here
```

# Optional: Database Configuration

```
DATABASE_URL=postgresql://user:password@localhost:5432/bitgenius
```
### Development


# Start the development server
```bash
npm run dev
```
# or
```bash
pnpm dev
```

```
# Open http://localhost:3000 in your browser
```

## 📖 API Documentation

### Available Methods

BitGenius supports four main interaction methods:

#### 1. Invoice Generation

```http
POST /api/methods
Content-Type: application/json

{
  "method": "invoice",
  "amount": 100,
  "description": "AI Chat Session"
}
```

**Response:**
```json
{
"success": true,
"invoice": "lnbc100n1...",
"payment_hash": "abc123...",
"expires_at": "2024-01-01T12:00:00Z"
}

```

#### 2. Send Code Verification
```http
POST /api/methods
Content-Type: application/json

{
  "method": "sendcode",
  "phone": "+1234567890"
}
```

#### 3. Lightning Payment

```http
POST /api/methods
Content-Type: application/json

{
  "method": "lightning",
  "invoice": "lnbc100n1..."
}
```

#### 4. Voice Interaction

```http
POST /api/methods
Content-Type: application/json

{
  "method": "voice",
  "audio_data": "base64_encoded_audio"
}
```

### Chat Endpoint

```http
POST /api/chat
Content-Type: application/json
Authorization: Bearer <payment_proof>

{
  "message": "Hello, BitGenius!",
  "conversation_id": "optional_conversation_id"
}
```

### HTTP 402 Payment Flow

1. Client makes request to `/api/chat`
2. Server responds with `402 Payment Required` and Lightning invoice
3. Client pays the Lightning invoice
4. Client retries request with payment proof
5. Server processes the AI interaction


## Usage Examples

### Basic Chat Interaction

```javascript
// 1. Request chat (will return 402 if payment needed)
const chatResponse = await fetch('/api/chat', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ message: 'Hello!' })
});

if (chatResponse.status === 402) {
// 2. Get payment invoice
const paymentData = await chatResponse.json();

// 3. Pay invoice (using your Lightning wallet)
await payLightningInvoice(paymentData.invoice);

// 4. Retry with payment proof
const paidChatResponse = await fetch('/api/chat', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Authorization': `Bearer ${paymentProof}`
},
body: JSON.stringify({ message: 'Hello!' })
});

const aiResponse = await paidChatResponse.json();
console.log(aiResponse.message);
}
```


### Custom Agent Configuration

```javascript
// Configure BitGenius for specific use cases
const agentConfig = {
  personality: "helpful coding assistant",
  expertise: ["JavaScript", "Bitcoin", "Lightning Network"],
  paymentAmount: 50, // sats per interaction
  model: "gpt-4"
};

await fetch('/api/configure', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(agentConfig)
});
```

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically


### Docker Deployment

# Build the Docker image

```bash
docker build -t bitgenius .
```
# Run the container

```bash
docker run -p 3000:3000 --env-file .env.local bitgenius
```

### Self-Hosted Deployment


# Build the application
```bash
npm run build
```

# Start the production server
```bash
npm start
```

## Security Considerations

- **Macaroon Security**: Store Lightning macaroons securely and use least-privilege access
- **Rate Limiting**: Implement rate limiting to prevent abuse
- **Payment Verification**: Always verify Lightning payments before processing requests
- **API Keys**: Rotate OpenAI API keys regularly
- **HTTPS**: Use HTTPS in production for secure communication


## ️ Customization

### Creating Custom Agents

1. Fork the repository
2. Modify the AI prompt in `/lib/ai-config.js`
3. Adjust payment amounts and models
4. Customize the UI components
5. Deploy your custom agent


### Supported Agent Types

- **Code Assistant**: Programming help with Lightning payments
- **Content Creator**: Writing assistance with micropayments
- **Tutor**: Educational interactions with pay-per-question
- **Consultant**: Professional advice with premium pricing


## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **Documentation**: [docs.bitgenius.ai](https://docs.bitgenius.ai)
- **Issues**: [GitHub Issues](https://github.com/clobig/bitgenius_ai/issues)
- **Email**: [info@clobig.com](mailto:info@clobig.com)


## Acknowledgments

- OpenAI for providing powerful language models
- Lightning Network developers for enabling instant micropayments
- The Bitcoin community for building the foundation of digital money


## Roadmap

- Multi-language support
- Advanced payment routing
- Plugin system for custom integrations
- Mobile app development
- Enterprise features
- Advanced analytics dashboard


---

**Made with ⚡ by Clobig**

*BitGenius - Where AI meets Bitcoin Lightning*
