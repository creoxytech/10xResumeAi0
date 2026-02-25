import { forwardRef } from 'react';
import type { ResumeData, TemplateId } from '../types/resume';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { AcademicTemplate } from './templates/AcademicTemplate';
import { TechTemplate } from './templates/TechTemplate';

interface PreviewPanelProps {
    data: ResumeData;
    template: TemplateId;
    className?: string;
}

export const PreviewPanel = forwardRef<HTMLDivElement, PreviewPanelProps>(
    ({ data, template, className }, ref) => {
        return (
            <div className={`preview-wrapper ${className || ''}`}>
                {template === 'classic' && <ClassicTemplate data={data} ref={ref} />}
                {template === 'modern' && <ModernTemplate data={data} ref={ref} />}
                {template === 'minimal' && <MinimalTemplate data={data} ref={ref} />}
                {template === 'professional' && <ProfessionalTemplate data={data} ref={ref} />}
                {template === 'creative' && <CreativeTemplate data={data} ref={ref} />}
                {template === 'executive' && <ExecutiveTemplate data={data} ref={ref} />}
                {template === 'academic' && <AcademicTemplate data={data} ref={ref} />}
                {template === 'tech' && <TechTemplate data={data} ref={ref} />}
            </div>
        );
    }
);
