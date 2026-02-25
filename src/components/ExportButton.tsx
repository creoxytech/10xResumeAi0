import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DownloadIcon } from 'lucide-react';

interface ExportButtonProps {
    targetRef: React.RefObject<HTMLDivElement | null>;
    fileName?: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ targetRef, fileName = 'resume.pdf' }) => {
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
        if (!targetRef.current) return;

        setIsExporting(true);
        try {
            const element = targetRef.current;
            // We momentarily adjust styling to ensure the export is pristine
            const originalBoxShadow = element.style.boxShadow;
            element.style.boxShadow = 'none';

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            element.style.boxShadow = originalBoxShadow;

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4', true);

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const imgHeight = (canvas.height * pdfWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
            heightLeft -= pageHeight;

            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
                heightLeft -= pageHeight;
            }

            pdf.save(fileName);
        } catch (error) {
            console.error('Failed to export PDF:', error);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <button
            onClick={handleExport}
            disabled={isExporting}
            className={`export-btn ${isExporting ? 'loading' : ''}`}
        >
            <DownloadIcon size={18} />
            <span>{isExporting ? 'Exporting...' : 'Download PDF'}</span>
        </button>
    );
};
