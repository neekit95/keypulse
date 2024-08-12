import style from './last-results.module.scss';

interface Results {
	speed: number;
	accuracy: number
}

const LastResults = (props: Results) => {
	return (
		<div className={style.container}>
			<p>
				Скрость: {props.speed}
			</p>
			<p>
				Точность: {props.accuracy}
			</p>
			<button>
				X
			</button>
		</div>
	);
};

export default LastResults;

