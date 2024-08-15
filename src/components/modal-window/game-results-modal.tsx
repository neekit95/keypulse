import React, {useCallback, useEffect} from 'react';
import style from './game-results-modal.module.scss';
import Modal from 'react-modal';


interface GameResultsModalProps {
	isModalOpen: boolean;
	errorCount: number;
	accuracy: number;
	speed: number;
	handleRestart: () => void;
	modalButtonRef: React.RefObject<HTMLButtonElement>;
}

const GameResultsModal: React.FC<GameResultsModalProps> =
	({
		 isModalOpen,
		 errorCount,
		 accuracy,
		 speed,
		 handleRestart,
		 modalButtonRef
	 }) => {

		function generateUniqueId() {
			return Date.now().toString();
		}

		const saveResult = useCallback((speed: number, accuracy: number) => {
			const id = generateUniqueId();
			const userResult = {
				userSpeed: speed,
				userAccuracy: accuracy,
				id: id,
			};
			localStorage.setItem(`userResult_${id}`, JSON.stringify(userResult));
		}, []);

		useEffect(() => {
			if (isModalOpen && accuracy && speed) {
				saveResult(speed, accuracy);
			}
		}, [isModalOpen, accuracy, speed, saveResult]);

		return (
			<Modal
				isOpen={isModalOpen}
				onRequestClose={handleRestart}
				contentLabel="Результаты игры"
				className={style.modal}
				overlayClassName={style.overlay}
			>
				<h2>Результаты игры</h2>
				<div className={style.results}>
					<p>
						Количество ошибок: <span>{errorCount}</span>
					</p>
					<p>Точность (%): <span>{isNaN(accuracy) ? 'N/A' : accuracy}</span></p>
					<p>Скорость (зн/мин): <span>{isNaN(speed) ? 'N/A' : speed}</span></p>
				</div>
				<button onClick={handleRestart} ref={modalButtonRef}>
					Начать заново
				</button>
			</Modal>
		);
	};

export default GameResultsModal;

