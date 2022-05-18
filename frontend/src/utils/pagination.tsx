import {Pagination} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export const PaginationUtils = (props: any) => {

	const navigate = useNavigate();

	const renderRight = () => {
		let nextButtons = [];
		for (let pgNum = props.page + 1; pgNum <= props.page + 3; pgNum++) {
			if (pgNum == props.page + 3) {
				nextButtons.push(<Pagination.Ellipsis disabled/>);
			}
			else {
				let url = `${props.url}?pageNumber=${pgNum}`;
				if (props.offSet) url += `&offSet=${props.offSet * (pgNum - 1)}`;
				if (props.filter) url += `&${props.filter}`
				nextButtons.push(<Pagination.Item onClick={() => {
					navigate(url);
				}}>{pgNum}</Pagination.Item>);
			}
		}
		let url = `${props.url}?pageNumber=${props.page+1}`;
		if (props.offSet) url += `&offSet=${props.offSet * (props.page)}`;
		if (props.filter) url += `&${props.filter}`;
		nextButtons.push(<Pagination.Next onClick={() => {
			navigate(url);
		}}/>);
		return nextButtons;
	}

	const renderLeft = () => {
		let prevButtons = [];
		for (let pgNum = props.page - 1; pgNum >= props.page - 3; pgNum--) {
			if (pgNum == props.page - 3) {
				prevButtons.unshift(<Pagination.Ellipsis disabled/>);
			}
			else {
				let url = `${props.url}?pageNumber=${pgNum}`;
				if (props.offSet) url += `&offSet=${props.offSet * (pgNum - 1)}`;
				if (props.filter) url += `${props.url}?pageNumber=${pgNum}&${props.filter}`;
				return <Pagination.Item onClick={() => navigate(url)}>{pgNum}</Pagination.Item>
			}
		}
		let url = `${props.url}?pageNumber=${props.page+1}`;
		if (props.offSet) url += `&offSet=${props.offSet * (props.page - 2)}`;
		if (props.filter) url = `${props.url}?pageNumber=${props.page+1}&${props.filter}`
		prevButtons.unshift(<Pagination.Prev onClick={() => {
			navigate(url);
		}}/>);
		return prevButtons;
	}

	const renderFirst = () => {
		let url = `${props.url}?pageNumber=1`;
		if (props.offSet) url += `&offSet=0`;
		if (props.filter) url = `${props.url}?pageNumber=1&${props.filter}`
		return <Pagination.First onClick={() => navigate(url)} />
	}

	const renderLast = () => {
		let url = `${props.url}?pageNumber=${props.maxPage}`
		if (props.offSet) url += `&offSet=${props.offSet * (props.maxPage-1)}`;
		if (props.filter) url = `${props.url}?pageNumber=${props.maxPage}&${props.filter}`;
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
