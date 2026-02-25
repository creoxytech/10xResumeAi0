import React, { useRef, useState } from 'react';
import { UploadCloudIcon } from 'lucide-react';

interface ImportResumeButtonProps {
    onImport: (file: File) => void;
    isLoading: boolean;
    iconOnly?: boolean;
}

export const ImportResumeButton: React.FC<ImportResumeButtonProps> = ({ onImport, isLoading, iconOnly }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onImport(e.target.files[0]);
            e.target.value = ''; // reset
        }
    };

    const buttonContent = (
        <>
            <UploadCloudIcon size={iconOnly ? 20 : 16} />
            {!iconOnly && <span>{isLoading ? 'Extracting...' : 'Import Resume'}</span>}
        </>
    );

    if (iconOnly) {
        return (
            <>
                <input
                    type="file"
                    accept="application/pdf,image/png,image/jpeg"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <button
                    type="button"
                    className={`upload-btn ${isLoading ? 'loading' : ''}`}
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                    title="Import existing Resume (PDF)"
                >
                    {buttonContent}
                </button>
            </>
        );
    }

    return (
        <div className="import-resume-wrapper">
            <input
                type="file"
                accept="application/pdf,image/png,image/jpeg"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <button
                className={`import-resume-btn ${isLoading ? 'loading' : ''} ${isHovering ? 'hover' : ''}`}
                onClick={() => fileInputRef.current?.click()}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                disabled={isLoading}
                title="Import existing Resume (PDF/Image)"
            >
                {buttonContent}
            </button>
        </div>
    );
};
