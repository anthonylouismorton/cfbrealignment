"use client"
import React, {useEffect} from "react";

const DownloadJson = () => {
  useEffect(() => {
    async function fetchAndSaveJson() {
      try {
        const response = await fetch(
          'https://cdn.jsdelivr.net/npm/us-atlas@3/states-albers-10m.json'
        );
        const mapData = await response.json();

        // Create a Blob with the JSON data
        const blob = new Blob([JSON.stringify(mapData, null, 2)], { type: 'application/json' });

        // Generate a download link for the Blob
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'mapData.json';
        downloadLink.innerText = 'Download mapData.json';

        // Append the download link to the document
        document.body.appendChild(downloadLink);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    }

    fetchAndSaveJson();
  }, []);

  return (
    <div className="App">
      <p>Fetching JSON data and saving as a local file...</p>
    </div>
  );
};

export default DownloadJson;
