import React from 'react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

interface DocumentViewerProps {
  fileType?: string;
  fileUrl: string;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  fileType,
  fileUrl,
}) => {
  return fileUrl ? (
    <DocViewer
      pluginRenderers={DocViewerRenderers}
      documents={[{ uri: fileUrl, fileType: fileType }]}
      style={{
        width: '100%',
      }}
      config={{
        header: {
          disableHeader: false,
          disableFileName: false,
          retainURLParams: false,
        },
        pdfVerticalScrollByDefault: true,
      }}
    />
  ) : null;
};

export default DocumentViewer;
