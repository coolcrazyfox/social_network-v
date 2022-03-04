import React, { useState } from "react";
import s from "./Pagination.module.scss";
import cn from "classnames";
import Button from "../Button/Button";

type PaginationPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize: number
}

export let Pagination: React.FC<PaginationPropsType> = ({
    totalItemsCount,
    pageSize,
    currentPage,
    onPageChanged,
    portionSize,
}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = (pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState<number>(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div className={s.pagination}>
        <div className={s.buttonContainer}>
            <Button disabled={portionNumber <= 1}
                    className={s.button}
                    onClick={() => setPortionNumber(portionNumber - 1)}>Prev list
            </Button>

            <Button disabled={currentPage <= 1}
                    className={s.button}
                    onClick={() => onPageChanged(currentPage - 1)}>Prev
            </Button>

            <Button disabled={currentPage >= pagesCount}
                    className={s.button}
                    onClick={() => onPageChanged(currentPage + 1)}>Next
            </Button>

            <Button disabled={portionCount <= portionNumber}
                    className={s.button}
                    onClick={() => setPortionNumber(portionNumber + 1)}>Next list
            </Button>
        </div>
        <div className={s.text}>Current page: <p className={s.currentNumber}>{currentPage}</p></div>
        <div>
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span key={p}
                                 onClick={() => {onPageChanged(p)}}
                                 className={cn(s.page, {[s.selectPage]: currentPage === p})}>{p}</span>
                })
            }
        </div>
    </div>
}