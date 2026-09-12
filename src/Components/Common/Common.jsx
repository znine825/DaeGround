import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Icon } from './../Icons/Icons.jsx'
import { Bus, Walk } from '../TripCommon/TripCommon.jsx'
import { getPostsByUid, getComments } from "./../../Javascript/firebase_logic.js"
import './Common.css'

export function Logo({width = 35, height = 40}) {
    return (
        <svg width={`${width}`} height={`${height}`} viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 1.3C0 0.582029 0.58203 0 1.3 0H28H29.8667C32.7017 0 35 2.29827 35 5.13333V27.8667C35 30.7017 32.7017 33 29.8667 33H28H1C0.447715 33 0 32.5523 0 32V17.875V1.3Z" fill="#34C759"/>
            <path d="M3 11C3 9.89543 3.89543 9 5 9H30C31.1046 9 32 9.89543 32 11V27C32 28.6569 30.6569 30 29 30H5C3.89543 30 3 29.1046 3 28V11Z" fill="white"/>
            <path d="M3 4C3 3.44772 3.44772 3 4 3H29.3529C30.8149 3 32 4.18513 32 5.64706C32 5.84198 31.842 6 31.6471 6H4C3.44772 6 3 5.55228 3 5V4Z" fill="white"/>
            <path d="M3 40L6.11111 30H9L6 40H3Z" fill="#34C759"/>
            <path d="M32 40L28.8889 30H26L28.8889 40H32Z" fill="#34C759"/>
            <circle cx="8" cy="26" r="2" fill="#34C759"/>
            <circle cx="27" cy="26" r="2" fill="#34C759"/>
            <path d="M27.5 35.5L7.5 35.5L7 37.5L28 37.5L27.5 35.5Z" fill="#34C759" stroke="#34C759"/>
        </svg>
    )
}


export function Title({icon, text, title, subtitle, locate}) {
    return (
        <div className = {`title ${locate}`}>
            <div>
                <Icon name = {icon} color = '#34C759' />
                <p>{text}</p>
            </div>
            <p>{title}</p>
            <p>{subtitle}</p>
        </div>
    )
}

export function Input({value, setValue, title, warning, condition, errch, showPassword}) {

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <div className = 'inputArea'>
            <p>{title}</p>
            <input className = {errch ? 'inputT' : 'inputF'}
                type = {showPassword ? 'text' : 'password'}
                placeholder = {warning}
                value = {value}
                onChange = {handleChange}
            />
            <p>{condition}</p>
        </div>
    );
}


export function Button({ width, height, text, fsize, fweight }) {
    return (
        <div className = 'ButtonComponent'
             style = {{ width: `${width}px`, 
                        height: `${height}px`,
                        fontSize: `${fsize}px`,
                        fontWeight: fweight}}>
            <p>{ text }</p>
        </div>
    )
}

export function LoadMap({contents}) {    
    return (
        <div className = "loadMap">
            {contents.map((item, index) => {
                return (
                    <div key = {index}>
                        <div>
                            <div>
                                <div><p>0{index + 1}</p></div>
                                <Icon name = {item.icon} color = 'var(--LM-main-color)' />
                            </div>
                            <p>{item['title']}</p>
                            <p>{item['subtitle']}</p>
                            
                        </div>
                        {item.line && <p>- - - - - - - - - -</p>}
                    </div>
                )
            })}
        </div>
    )
}

export function Info({ title, subtitle, warning, icon, set = false, value, setValue }) {

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <div className = 'infoComponent'>
             <div>
                <div></div>
                <Icon name = {icon} color = 'var(--LM-main-color)'/>
             </div>
             {!set && 
             <div>
                <p>{title}</p>
                <p>{subtitle}</p>
             </div>}
             {set && 
             <div>
                <motion.p
                    initial={{ y: 0}}
                    whileInView={{ y: -20}}
                    transition={{
                        duration: 0.2,
                        ease: "easeOut" }}>{title}</motion.p>
                <motion.input 
                    value = {value}
                    onChange = {handleChange}
                    placeholder = {warning}
                    initial={{ y: 20}}
                    whileInView={{ y: 0}}
                    transition={{
                        duration: 0.2,
                        ease: "easeOut" }}/>
             </div>}
        </div>
    )
}

export function InfoHeader({contents}) {
    return (
        <div className = 'infoHeader'>
            <div>
                <div>
                    <div></div>
                    <Icon name = {contents.icon} color = 'color-mix(in srgb, var(--LM-background-color) 80%, #FFFFFF00 20%)' width = '90' height = '90' strc = '1.3'/>
                </div>
                <div>
                    <p>{contents.name}</p>
                    <p>가입일 {contents.date}</p>
                </div>
            </div>
            <div>
                <div>
                    <div>
                        <Icon name = 'file' color = 'var(--LM-background-color)'/>
                    </div>
                    <p>{contents.postCount}</p>
                    <p>게시글</p>
                </div>
                <div>
                    <div>
                        <Icon name = 'comment' color = 'var(--LM-background-color)'/>
                    </div>
                    <p>{contents.commentCount}</p>
                    <p>댓글</p>
                </div>
                <div>
                    <div>
                        <Icon name = 'chartbar' color = 'var(--LM-background-color)'/>
                    </div>
                    <p>{contents.co2}g</p>
                    <p>절감 CO2</p>
                </div>
            </div>
            <Icon name = 'profile' color = 'color-mix(in srgb, var(--LM-background-color) 30%, #FFFFFF00 70%)' width = '250' height = '250' strc = '1'/>
        </div>
    )
}

export function Post(post) {
    const navigate = useNavigate();

    function formatDate(timestamp) {
        if (!timestamp || typeof timestamp.toDate !== "function") {
            return "";
        }

        const date = timestamp.toDate();

        if (isNaN(date.getTime())) {
            return "";
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}. ${month}. ${day}`;
    }
    const cuPost = post.post;
    const data = JSON.parse(cuPost.content);
    const [com, setCom] = useState(null);

    useEffect(() => {
        async function postStart() {
            const comment = await getComments(cuPost.id);
            setCom(comment);
        }
        postStart();
    }, [])

    if (!com) {
        return <div>로딩중</div>
    }

    return (
        <div className="post"  onClick={() => navigate(`/NoticeBoard/${cuPost.id}`)}>
            <img src = {data.contentImage} />
            <div>
                <div>
                    <Icon
                        name="comment"
                        color="var(--LM-background-color)"
                    />
                    <p>{com.length}</p>
                    <Icon
                        name="heart"
                        color="var(--LM-background-color)"
                    />
                    <p>{cuPost.likeCount}</p>
                    <Icon
                        name="chartbar"
                        color="var(--LM-background-color)"
                    />
                    <p>{cuPost.view}</p>
                </div>
            </div>
            <div>
                <p>{cuPost.title}</p>
                <p>{data.allDay == 1 ? '당일 여행' : `${data.allDay - 1}박 ${data.allDay}일`}</p>
            </div>
            <p>제작 날짜 | {formatDate(cuPost.createdAt)}</p>
        </div>
    );
}

export function PageHeader({contents}) {
    return (
        <div className = 'pageheader' style={{ height: `${contents.heigth}px` }}>
            <div>
                <div>
                    <Icon name = {contents.icon} color = 'var(--LM-main-color)'/>
                    <p>{contents.iconText}</p>
                </div>
            </div>
            <p>{contents.title}</p>
            <p>{contents.subtitle}</p>
            <img src = {contents.image} style={{ height: `${contents.heigth}px` }}/>
        </div>
    )
}

export function Comment({contents}) {
    return (
        <div className = 'comment'>
            <div>
                <div>
                    <Icon name = {contents.authorIcon} color = 'var(--LM-mainouttext-color)'/>
                </div>
                <p>{contents.authorName}</p>
            </div>
            <p>{contents.content}</p>
            <p>{contents.createdAt.toDate().toLocaleDateString()}</p>
        </div>
    )
}

export function LimitedTextarea({ value, onChange, maxLength = 100, maxLines = 5, ...rest }) {

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
        const currentLines = value.split("\n").length;
        if (currentLines >= maxLines) {
            e.preventDefault();
        }
        }
    };

    const handleChange = (e) => {
        let newValue = e.target.value;

        const lines = newValue.split("\n");
        if (lines.length > maxLines) {
        newValue = lines.slice(0, maxLines).join("\n");
        }

        if (newValue.length > maxLength) {
        newValue = newValue.slice(0, maxLength);
        }

        onChange(newValue);
    };

    return (
        <textarea
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            rows={maxLines}
            {...rest}
        />
    );
}
