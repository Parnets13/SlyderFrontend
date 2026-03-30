const tickerItems = [
  '🇮🇳 Indian Hospitality Takes the Lead',
  '❖',
  'Slyder Launches Hotel Lock System with 100% Made in India RFID Reader & Indigenous Software',
  '❖',
  'Industry-First Transaction Alert Feature',
  '❖',
  'A Proud Moment for Indian Hospitality Industry',
  '❖',
  'Slyder Unveils Hotel Lock System with 100% Made in India Technology',
  '❖',
  'Introducing Industry-First Revolutionary Transaction Alert Feature',
  '❖',
]

const tickerText = tickerItems.join('     ')

function Announcement() {
  return (
    <div className="announcement-root">
      <div className="announcement-track">
        <div className="announcement-inner">
          <span className="announcement-text">{tickerText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="announcement-text">{tickerText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
      </div>

      <style>{`
        .announcement-root {
          position: relative;
          width: 100%;
          overflow: hidden;
          margin-top: 32px;
          background: #001f5b;
          border-top: 1px solid rgba(255,255,255,0.1);
          border-bottom: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }

        .announcement-track {
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .announcement-inner {
          display: flex;
          white-space: nowrap;
          animation: ticker 45s linear infinite;
          will-change: transform;
        }

        .announcement-text {
          font-size: 17px;
          font-weight: 600;
          letter-spacing: 0.05em;
          font-family: 'Segoe UI', system-ui, sans-serif;
          padding: 10px 0;
          color: #001f5b;
          background: #e8edf7;
        }

        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        @media (max-width: 640px) {
          .announcement-text { font-size: 14px; padding: 8px 0; }
        }
      `}</style>
    </div>
  )
}

export default Announcement
