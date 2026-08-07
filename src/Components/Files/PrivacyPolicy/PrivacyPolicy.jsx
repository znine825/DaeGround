import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import privacyPolicy from './privacy.md?raw';
import { createPortal } from 'react-dom';
import { iconMap } from './../../../Components/Icons/Icons.jsx'
import 'github-markdown-css/github-markdown-light.css';
import './PrivacyPolicy.css'

function PrivacyPage({setShowprivate}) {

    const CloseIcon = iconMap['close'];

    return createPortal(
        <div className = 'private'>
            <div>
                <div onClick = {() => setShowprivate(false)}>
                    <CloseIcon color = 'var(--LM-subtext-color)'/>
                </div>
                <div className="markdown-body">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{privacyPolicy}</ReactMarkdown>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default PrivacyPage