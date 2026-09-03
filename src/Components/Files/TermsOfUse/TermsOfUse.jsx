import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import termsMarkdown from './TermsOfUse.md?raw';
import { createPortal } from 'react-dom';
import { Icon } from '../../Icons/Icons.jsx';
import 'github-markdown-css/github-markdown-light.css';
import './TermsOfUse.css';

function TermsOfUse({ setShowTermsOfUse }) {
    return createPortal(
        <div className="private">
            <div>
                <div onClick={() => setShowTermsOfUse(false)}>
                    <Icon name="close" color="var(--LM-subtext-color)" />
                </div>
                <div className="markdown-body">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {termsMarkdown}
                    </ReactMarkdown>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default TermsOfUse;