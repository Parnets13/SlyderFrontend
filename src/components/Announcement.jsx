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
          background: linear-gradient(-45deg, #ee7752, #23a6d5, #23d5ab, #764ba2);
          background-size: 400% 400%;
          animation: gradientShift 10s ease infinite;
          border-top: 1px solid rgba(255,255,255,0.25);
          border-bottom: 1px solid rgba(255,255,255,0.15);
          box-shadow: 0 6px 40px rgba(0,0,0,0.25);
        }

        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
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
          font-size: 32px;
          font-weight: 900;
          letter-spacing: 0.05em;
          font-family: 'Segoe UI', system-ui, sans-serif;
          padding: 22px 0;
          color: #fff;
          text-shadow:
            0 2px 12px rgba(0,0,0,0.3),
            0 0 40px rgba(255,255,255,0.15);
        }

        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        @media (max-width: 640px) {
          .announcement-text { font-size: 22px; padding: 16px 0; }
        }
      `}</style>
    </div>
  )
}

export default Announcement
