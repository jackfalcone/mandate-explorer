const pdfService = {
  getPdfUrl: (type) => {
    if (type === 'sr') {
      return process.env.REACT_APP_PDF_SR_URL;
    } else if (type === 'nr') {
      return process.env.REACT_APP_PDF_NR_URL;
    }
    console.warn("Unknown type:", type);
    return null;
  },

  openPdf: (type) => {
    const url = pdfService.getPdfUrl(type);
    if (!url) {
        console.error("PDF URL not found for type:", type);
        return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
    return true;
  },

  fetchPdfAsArrayBuffer: async (type) => {
    const url = pdfService.getPdfUrl(type);
    if (!url) {
        throw new Error(`No PDF URL for type: ${type}`);
    }
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch PDF (${res.status} ${res.statusText})`);
    }
    const arrayBuffer = await res.arrayBuffer();
    return arrayBuffer;
  },
}

export default pdfService;
