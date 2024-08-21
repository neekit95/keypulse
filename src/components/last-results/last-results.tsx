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
				Скрость:
				<span>
					{props.speed}
				</span>
				Зн/м
			</p>
			<p>
				Точность:
				<span>
					{props.accuracy}
				</span>
				%
			</p>
			<button onClick={handleDelete}>
				Удалить
			</button>
		</div>
	);
};

export default LastResults;

