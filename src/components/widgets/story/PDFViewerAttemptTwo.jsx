import React, { Component } from 'react';
import FileViewer from 'react-file-viewer';

const file = './dummy.pdf'
const type = 'pdf'

const FileViewerComp = () => {
    return (
        <FileViewer
          fileType={type}
          filePath={file}
          />
      );
}

export default FileViewerComp
