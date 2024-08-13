import style from './last-results.module.scss';

interface Results {
	speed: number;
	accuracy: number
	id: number;
	onDelete: (id: number) => void;
}

const LastResults: React.FC<Results> = (props) => {

	const handleDelete = () => {
		props.onDelete(props.id);
	}

	return (
		<div className={style.container}>
			<p>
				Скрость: {props.speed}
			</p>
			<p>
				Точность: {props.accuracy}
			</p>
			<button onClick={handleDelete}>
				X
			</button>
		</div>
	);
};

export default LastResults;

