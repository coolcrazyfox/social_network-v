import React from "react";
import s from "./Music.module.scss"

const Music = () => {
    return (
        <div className={s.container}>
            <div className={s.iframeWrapper}>
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/KB15PmfhvBY"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className={s.roundBorderTopLeft}
                >
                </iframe>
            </div>
            <div className={s.iframeWrapper}>
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/3oHhEx7voLs"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className={s.roundBorderTopRight}
                >
                </iframe>
            </div>
            <div className={s.iframeWrapper}>
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/lSAz2ONC1rk"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className={s.roundBorderBottomRight}
                >
                </iframe>
            </div>
            <div className={s.iframeWrapper}>
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/GsiKHJtSFyg"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className={s.roundBorderBottomLeft}
                >
                </iframe>
            </div>
        </div>
    )
}

export default Music;