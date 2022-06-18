import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Works as per - https://github.com/wojtekmaj/react-pdf/issues/300#issuecomment-886037824
// Testing a dummy pdf
// eslint-disable-next-line
// import file from '@images/dummy.pdf'

// To solve this error - https://github.com/wojtekmaj/react-pdf/issues/680#issuecomment-723656449

const PDFViewer = ({pdfSrc}:any) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // eslint-disable-next-line
  function onDocumentLoadSuccess({ numPages }:any) {
    setNumPages(numPages);
    setPageNumber(1)
  }

  return (
    <div className="pdf-container">
      <Document
        file={pdfSrc}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
    </div>
  );
}

 // {story.fileMimeType === MimeType.PDF
                                //     ? <PDFViewer pdfSrc={story.url}/>
                                //     : <img src={story.url} alt="report png/jpg/jpeg/svg" />
                                // }

export default PDFViewer