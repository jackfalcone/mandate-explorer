export async function parsePdf(arrayBuffer) {
    const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
    const pages = pdf.getPages();
    const firstPage = pages[0];
    const text = await firstPage.getTextContent();
    return text.items.map(item => item.str).join('');
}