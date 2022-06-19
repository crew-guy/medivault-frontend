import { useState } from 'react';
import { Document, Page,pdfjs } from 'react-pdf'

// Works as per - https://github.com/wojtekmaj/react-pdf/issues/300#issuecomment-886037824
// Testing a dummy pdf
// eslint-disable-next-line
// import file from '@images/dummy.pdf'

// To solve this error - https://github.com/wojtekmaj/react-pdf/issues/680#issuecomment-723656449

const PDFViewer = ({pdfSrc}:any) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);

  // eslint-disable-next-line
  function onDocumentLoadSuccess({ numPages }:any) {
    setNumPages(numPages);
  }
  console.log(pdfSrc)

  return (
    <div className="pdf-container">
      <Document
        file={pdfSrc}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={ <div className="loading">Loading...</div> }
      >
        {Array.from(Array(numPages).keys()).map((p) => (
          <Page key={p} pageNumber={p + 1} />
        ))}
      </Document>
    </div>
  );
}

export default PDFViewer