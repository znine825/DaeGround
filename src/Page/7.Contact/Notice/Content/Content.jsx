import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useParams } from 'react-router-dom';
import { PageHeader, Post, Comment, Button } from './../../../../Components/Common/Common.jsx'


import 'github-markdown-css/github-markdown-light.css';
import './Content.css';

const contents = import.meta.glob('./../Writing/*.md', {
    query: '?raw',
    import: 'default',
    eager: true
});

function Contact() {
    const { contentId } = useParams();

    const contentKey = Object.keys(contents).find(
        key => key.split('/').pop().replace('.md', '') === contentId
    );

    const content = contents[contentKey];

    const ph = {
        image: './Image/bagic/PageHeader.png',
        icon: 'file',
        iconText: '공지',
        title: '공지사항',
        subtitle: '사이트 소식, 공지 등을 확인할 수 있어요',

        heigth: 200
    };


    if (!content) {
        return <div>존재하지 않는 문서입니다.</div>;
    }


    return (
        <div className = 'ContentPage'>
            <PageHeader contents = {ph}/>
            <div className = 'detail'>
                <div className = "markdown-body">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}

export default Contact;