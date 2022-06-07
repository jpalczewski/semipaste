import {Pagination} from "react-bootstrap";
import {useSearchParams} from "react-router-dom";
import React from "react";
import {handleURL} from "./url";

export const getPaginationURL = (searchParams: URLSearchParams, pageNumber: number) => {
	let url: string = searchParams.toString();
	return handleURL(url, searchParams.get("pageNumber"), "pageNumber", `${pageNumber}`);
}

export const PaginationUtils = (props: any) => {

	// const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const renderRight = () => {
		let nextButtons = [];
		for (let pgNum = props.page + 1; pgNum <= props.page + 3 && pgNum <= props.maxPage; pgNum++) {
			if (pgNum === props.page + 3) {
				nextButtons.push(<Pagination.Ellipsis disabled/>);
			}
			else {
				// let url = getUrl(pgNum, props.offSet * (pgNum - 1));
				let url = getPaginationURL(searchParams, pgNum);
				nextButtons.push(<Pagination.Item onClick={() => {
					setSearchParams(url);
				}}>{pgNum}</Pagination.Item>);
			}
		}
		// let url = getUrl(props.page+1, props.offSet * (props.page));
		let url = getPaginationURL(searchParams, props.page+1);
		nextButtons.push(<Pagination.Next onClick={() => {
			setSearchParams(url);
		}}/>);
		return nextButtons;
	}

	const renderLeft = () => {
		let prevButtons = [];
		for (let pgNum = props.page - 1; pgNum >= props.page - 3 && pgNum >= 1; pgNum--) {
			if (pgNum === props.page - 3) {
				prevButtons.unshift(<Pagination.Ellipsis disabled/>);
			}
			else {
				// let url = getUrl(pgNum, props.offSet * (pgNum - 1));
				let url = getPaginationURL(searchParams, pgNum);
				prevButtons.unshift(<Pagination.Item onClick={() => setSearchParams(url)}>{pgNum}</Pagination.Item>);
			}
		}
		// let url = getUrl(props.page-1, props.offSet * (props.page - 2));
		let url = getPaginationURL(searchParams, props.page-1);
		prevButtons.unshift(<Pagination.Prev onClick={() => {
			setSearchParams(url);
		}}/>);
		return prevButtons;
	}

	const renderFirst = () => {
		// let url = getUrl(1, 0);
		let url = getPaginationURL(searchParams, 1);
		return <Pagination.First onClick={() => setSearchParams(url)} />
	}

	const renderLast = () => {
		// let url = getUrl(props.maxPage, props.offSet * (props.maxPage-1));
		let url = getPaginationURL(searchParams, props.maxPage);
		return <Pagination.Last onClick={() => setSearchParams(url)} />
	}

	return (
		<Pagination className="m-0">
			{props.page > 1 && renderFirst()}
			{props.page > 1 && renderLeft()}
			{props.maxPage !== 1 && <Pagination.Item active>{props.page}</Pagination.Item>}
			{props.page !== props.maxPage && renderRight()}
			{props.page !== props.maxPage && renderLast()}
		</Pagination>
	)
}
