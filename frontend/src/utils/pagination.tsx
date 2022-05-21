import {Pagination} from "react-bootstrap";
import {useNavigate, useSearchParams} from "react-router-dom";

export const setURL = (searchParams: URLSearchParams, pageNumber: number) => {
	let url = searchParams.toString();

	// empty
	if (url === "") {
		url += `?pageNumber=${pageNumber}`;
	}
	// not empty
	else {
		let urlPageNumber = searchParams.get("pageNumber");

	}
	return url;
}

export const PaginationUtils = (props: any) => {

	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	// const getUrl = (pageNumber: number, setOffSet: number) => {
	// 	let url = `${props.url}?pageNumber=${pageNumber}`;
	// 	if (props.offSet) url += `&offSet=${setOffSet}`;
	// 	if (props.filter) url += `&${props.filter}`
	// 	return url;
	// }


	const renderRight = () => {
		let nextButtons = [];
		for (let pgNum = props.page + 1; pgNum <= props.page + 3 && pgNum <= props.maxPage; pgNum++) {
			if (pgNum == props.page + 3) {
				nextButtons.push(<Pagination.Ellipsis disabled/>);
			}
			else {
				// let url = getUrl(pgNum, props.offSet * (pgNum - 1));
				let url = setURL(searchParams, pgNum);
				nextButtons.push(<Pagination.Item onClick={() => {
					navigate(url);
				}}>{pgNum}</Pagination.Item>);
			}
		}
		// let url = getUrl(props.page+1, props.offSet * (props.page));
		let url = setURL(searchParams, props.page+1);
		nextButtons.push(<Pagination.Next onClick={() => {
			navigate(url);
		}}/>);
		return nextButtons;
	}

	const renderLeft = () => {
		let prevButtons = [];
		for (let pgNum = props.page - 1; pgNum >= props.page - 3 && pgNum >= 1; pgNum--) {
			if (pgNum == props.page - 3) {
				prevButtons.unshift(<Pagination.Ellipsis disabled/>);
			}
			else {
				// let url = getUrl(pgNum, props.offSet * (pgNum - 1));
				let url = setURL(searchParams, pgNum);
				prevButtons.unshift(<Pagination.Item onClick={() => navigate(url)}>{pgNum}</Pagination.Item>);
			}
		}
		// let url = getUrl(props.page-1, props.offSet * (props.page - 2));
		let url = setURL(searchParams, props.page-1);
		prevButtons.unshift(<Pagination.Prev onClick={() => {
			navigate(url);
		}}/>);
		return prevButtons;
	}

	const renderFirst = () => {
		// let url = getUrl(1, 0);
		let url = setURL(searchParams, 1);
		return <Pagination.First onClick={() => navigate(url)} />
	}

	const renderLast = () => {
		// let url = getUrl(props.maxPage, props.offSet * (props.maxPage-1));
		let url = setURL(searchParams, props.maxPage);
		return <Pagination.Last onClick={() => navigate(url)} />
	}

	return (
		<Pagination>
			{props.page > 1 && renderFirst()}
			{props.page > 1 && renderLeft()}
			<Pagination.Item active>{props.page}</Pagination.Item>
			{props.page != props.maxPage && renderRight()}
			{props.page != props.maxPage && renderLast()}
		</Pagination>
	)
}
