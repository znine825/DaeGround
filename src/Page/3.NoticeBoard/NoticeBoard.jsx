import { useEffect, useState } from "react";
import { getPost, getAllPosts, getUserInfo, addview, toggleLike, checkLike, getComments, addComment } from "./../../Javascript/firebase_logic";
import { PageHeader, Post, Comment, Button } from './../../Components/Common/Common.jsx';
import { Icon } from './../../Components/Icons/Icons.jsx';
import './NoticeBoard.css';

function NoticeBoard() {

    const [allPost, setAllPost] = useState(null);
    const [onLoading, setOnLoading] = useState(false);

    const [showRegion, setShowRegion] = useState(false);
    const [regionNumber, setRegionNumber] = useState(0);
    const RegionName = ['전체', '동구', '중구', '서구', '남구', '북구', '수성구', '달서구', '달성군'];

    const [showType, setShowType] = useState(false);
    const [typeNumber, setTypeNumber] = useState(0);
    const TypeName = ['날짜', '좋아요', '조회수'];

    const [sortStandard, setSortStandard] = useState(1); // 0 오름차순, 1 내림차순

    const [showPostNumber, setShowPostNumber] = useState([]);
    const [search, setSearch] = useState("");
    const [toggleSearch, setToggleSearch] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 16;

    function typetrans(text) {
        if (text === '날짜') return "createdAt";
        if (text === '좋아요') return "likeCount";
        if (text === '조회수') return "view";
    }

    useEffect(() => {
        async function loading() {
            setOnLoading(false);
            const allPost = await getAllPosts(typetrans(TypeName[typeNumber]), sortStandard);
            setAllPost(allPost);
            setOnLoading(true);
        }
        loading();
    }, [typeNumber, sortStandard]);

    useEffect(() => {
        if (!allPost) return;

        const filteredIndices = [];
        const keyword = search.trim().toLowerCase();
        const selectedRegion = RegionName[regionNumber];

        for (let i = 0; i < allPost.length; i++) {
            const post = allPost[i];

            if (keyword !== "" && !post.title?.toLowerCase().includes(keyword)) {
                continue;
            }

            if (selectedRegion !== "전체") {
                try {
                    const json = typeof post.content === "string" ? JSON.parse(post.content) : post.content;
                    if (!json.selectRegions?.some(region => region.includes(selectedRegion))) {
                        continue;
                    }
                } catch (e) {
                    console.error("Content JSON 파싱 에러:", e);
                    continue;
                }
            }

            filteredIndices.push(i);
        }

        setShowPostNumber(filteredIndices);
        setCurrentPage(1);

    }, [allPost, regionNumber, search, toggleSearch]);

    const ph = {
        image: './Image/bagic/PageHeader.png',
        icon: 'file',
        iconText: '게시판',
        title: '여행 게시판',
        subtitle: '다른사람들이 만든 다양한 경로를 볼 수 있어요',
        heigth: 250
    };

    const toggleRegion = () => setShowRegion(!showRegion);
    const toggleType = () => setShowType(!showType);

    const changeRegion = (i) => {
        setRegionNumber(i);
        setShowRegion(false);
    };

    const changeType = (i) => {
        setTypeNumber(i);
        setShowType(false);
    };

    const toggleSortStandard = () => {
        setSortStandard(prev => (prev === 1 ? 0 : 1));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setToggleSearch(!toggleSearch);
        }
    };

    if (!onLoading) {
        return <div>로딩중...</div>;
    }

    return (
        <div className='noticeboard'>
            <PageHeader contents={ph} />
            
            <div className='searchbar'>
                <div>
                    <Icon name='mapPin' color='var(--LM-mainouttext-color)' />
                    <input 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        onKeyDown={handleKeyDown}
                        placeholder='여행 제목으로 검색...'
                    />
                    <div onClick={() => setToggleSearch(!toggleSearch)} style={{ cursor: 'pointer' }}>
                        <Icon name='search' color='var(--LM-mainouttext-color)' />
                    </div>
                </div>

                <div>
                    <Icon name='map' color='var(--LM-mainouttext-color)' />
                    <p>대구광역시</p>
                    <div onClick={toggleRegion}>
                        <p>{RegionName[regionNumber]}</p>
                        <Icon name='down' color='var(--LM-mainouttext-color)' />
                    </div>
                    {showRegion && (
                        <div className='Menu MRegion'>
                            {RegionName.map((name, i) => (
                                i !== regionNumber && (
                                    <div key={i} onClick={() => changeRegion(i)}>
                                        <p>{name}</p>
                                    </div>
                                )
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <Icon name='map' color='var(--LM-mainouttext-color)' />
                    <div onClick={toggleType}>
                        <p>{TypeName[typeNumber]}</p>
                        <Icon name='down' color='var(--LM-mainouttext-color)' />
                    </div>
                    <div className='sortType' onClick={toggleSortStandard}>
                        <p>{sortStandard === 0 ? '오름차순' : '내림차순'}</p>
                    </div>
                    {showType && (
                        <div className='Menu MsortType'>
                            {TypeName.map((name, i) => (
                                i !== typeNumber && (
                                    <div key={i} onClick={() => changeType(i)}>
                                        <p>{name}</p>
                                    </div>
                                )
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div>
                {showPostNumber.length === 0 ? (
                    <div className = 'nonePostlist'>
                        <Icon name = 'map' color = 'var(--LM-line-color)' />
                        <p>경로 검색 결과가 없습니다</p>
                    </div>
                ) : (
                    showPostNumber
                        .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
                        .map((postIndex) => (
                            <div key={postIndex}>
                                <Post post={allPost[postIndex]} />
                            </div>
                        ))
                )}
            </div>

            <div className="NBpagination">
                {Array.from(
                    { length: Math.ceil(showPostNumber.length / postsPerPage) },
                    (_, i) => i + 1
                ).map(page => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? "active" : ""}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default NoticeBoard;