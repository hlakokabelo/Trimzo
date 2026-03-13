import { useState } from 'react';
import QRCode from 'react-qr-code';

interface QRGeneratorProps {
  shortUrl: string; // The shortened URL (e.g., https://your.domain/abc123)
}

const QRGenerator: React.FC<QRGeneratorProps> = ({ shortUrl }) => {
  const [showQR, setShowQR] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<'svg' | 'png'>('png');

  const handleDownload = () => {
    const svg = document.getElementById('qr-code');
    if (!svg) return;

    if (downloadFormat === 'svg') {
      // Download as SVG
      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `qrcode-${shortUrl.split('/').pop()}.svg`;
      link.click();
    } else {
      // Convert SVG to PNG and download
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = `qrcode-${shortUrl.split('/').pop()}.png`;
        link.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(new XMLSerializer().serializeToString(svg));
    }
  };

  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow">
      <button
        onClick={() => setShowQR(!showQR)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        {showQR ? 'Hide QR Code' : 'Generate QR Code'}
      </button>

      {showQR && (
        <div className="mt-4">
          <div className="flex justify-center p-4 bg-gray-50 rounded">
            <div style={{ background: 'white', padding: '16px' }}>
              <QRCode
                id="qr-code"
                value={shortUrl}
                size={256}
                bgColor="#FFFFFF"
                fgColor="#000000"
                level="M" // Medium error correction
              />
            </div>
          </div>

          <div className="mt-4 flex gap-2 justify-center">
            <select
              value={downloadFormat}
              onChange={(e) => setDownloadFormat(e.target.value as 'svg' | 'png')}
              className="px-3 py-2 border rounded"
            >
              <option value="png">PNG</option>
              <option value="svg">SVG</option>
            </select>
            
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Download QR Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRGenerator;