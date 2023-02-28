import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPagination } from '../store/slices/pagination.slice';

const Paginationdesign = ({ data }) => {
    
    const dispatch = useDispatch();
    const dataRecepted = useSelector(state => state[`${data}`])

    useEffect(() => {
        dispatch(setPagination([...dataRecepted].splice(0, 5)))
    }, [])

    const pages = [];
    const pageNumberLimit = 5;
    const totalPages = Math.ceil(dataRecepted?.length / 5);
    // const [newData, setNewData] = useState([...dataRecepted].splice(0, 5));
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPageLimit, setMaxPageLimit] = useState(5);
    const [minPageLimit, setMinPageLimit] = useState(0);

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        const firstIndex = pageNumber * 5
        console.log("boton actual" + pageNumber);
        dispatch(setPagination([...dataRecepted].splice((firstIndex - 5), 5)))
        // setNewData([...vehiclesRedux].splice((firstIndex - 5), 5))
    }

    const onPrevClick = () => {
        const prev = currentPage - 1
        const LastIndex = (prev - 1) * 5
        console.log("anterior");
        dispatch(setPagination([...dataRecepted].splice(LastIndex, 5)))
        // setNewData([...vehiclesRedux].splice(LastIndex, 5))
        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageLimit(maxPageLimit - pageNumberLimit);
            setMinPageLimit(minPageLimit - pageNumberLimit);
        }
        setCurrentPage(prev => prev - 1);
    }

    const onNextClick = () => {
        const next = currentPage + 1
        const firstIndex = next * 5
        console.log("siguiente");
        dispatch(setPagination([...dataRecepted].splice((firstIndex - 5), 5)))
        // setNewData([...vehiclesRedux].splice((firstIndex - 5), 5))
        if (currentPage + 1 > maxPageLimit) {
            setMaxPageLimit(maxPageLimit + pageNumberLimit);
            setMinPageLimit(minPageLimit + pageNumberLimit);
        }
        setCurrentPage(prev => prev + 1);
    }

    const handlePrevClick = () => {
        onPrevClick();
    }
    const handleNextClick = () => {
        onNextClick();
    }
    const handlePageClick = (e) => {
        onPageChange(Number(e.target.id));
    }


    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    const pageNumbers = pages.map(page => {
        if (page <= maxPageLimit && page > minPageLimit) {
            return (
                <li key={page} id={page} onClick={handlePageClick}
                    className={currentPage === page ? 'activeBar' : null}>
                    {page}
                </li>
            )
        } else {
            return null;
        }
    }
    )

    let pageIncrementEllipses = null;
    if (pages.length > maxPageLimit) {
        pageIncrementEllipses = <li onClick={handleNextClick}>&hellip;</li>
    }
    let pageDecremenEllipses = null;
    if (minPageLimit >= 1) {
        pageDecremenEllipses = <li onClick={handlePrevClick}>&hellip;</li>
    }


    return (
        <ul className="pageNumbers">
            <li>
                <button className='buttPg bx bxs-left-arrow' onClick={handlePrevClick} disabled={currentPage === pages[0]}>
                </button>
            </li>
            {pageDecremenEllipses}
            {pageNumbers}
            {pageIncrementEllipses}
            <li>
                <button className='buttPg bx bxs-right-arrow' onClick={handleNextClick} disabled={currentPage === pages[pages.length - 1]}></button>
            </li>
        </ul>
    );
};

export default Paginationdesign;