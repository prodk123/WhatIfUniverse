import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Only allow 3 or 6 digit hex colors to prevent malformed CSS
// (the value is interpolated into inline style templates).
const HEX_COLOR = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get('title');
    const categoryName = searchParams.get('categoryName') || 'What If Universe';
    const rawColor = searchParams.get('categoryColor') || '#3B82F6';
    const categoryColor = HEX_COLOR.test(rawColor) ? rawColor : '#3B82F6';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#050505',
            padding: '80px',
          }}
        >
          {/* Subtle background glow */}
          <div
            style={{
              position: 'absolute',
              top: '-20%',
              right: '-10%',
              width: '600px',
              height: '600px',
              backgroundColor: categoryColor,
              opacity: 0.2,
              filter: 'blur(100px)',
              borderRadius: '50%',
            }}
          />

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', zIndex: 10 }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                backgroundColor: categoryColor,
                marginRight: '20px',
                boxShadow: `0 0 40px ${categoryColor}60`
              }}
            />
            <span style={{ color: categoryColor, fontSize: 36, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {categoryName}
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '100%',
              zIndex: 10
            }}
          >
            <h1
              style={{
                fontSize: 80,
                fontWeight: 800,
                color: 'white',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: '40px',
                maxWidth: '900px',
              }}
            >
              {title ? (title.length > 80 ? title.slice(0, 80) + '...' : title) : 'Simulate Your Alternate Futures'}
            </h1>
            
            <p style={{ color: '#888888', fontSize: 36, fontWeight: 500 }}>
              What If Universe — Math for your biggest decisions.
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('OG image generation failed:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}
