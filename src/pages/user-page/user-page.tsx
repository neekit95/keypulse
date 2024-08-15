import React, {useEffect, useState} from 'react';
import style from './user-page.module.scss'
import Modal from 'react-modal';
import LastResults from "../../components/last-results/last-results";


interface User {
	userName: string | null;
	userAccuracy: string | null;
	userSpeed: string | null;
	userRang: string | null;
	userBestResult: {
		userBestAccruracy: string | null;
		userBestSpeed: string | null;
	};
	userMiddleResult: {
		userMiddleAccruracy: string | null,
		userMiddleSpeed: string | null,
	}
}

interface Results {
	userSpeed: number,
	userAccuracy: number,
	id: number
}

interface MiddleResult {
	middleUserSpeed: number;
	middleUserAccuracy: number;
}

interface BestResult {
	bestUserSpeed: number;
	bestUserAccuracy: number;
}


const UserPage = () => {
	const [name, setName] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(true);
	const [isOpenClearModal, setIsOpenClearModal] = useState(false);
	const [rang, setRang] = useState('beginner')
	const [middleResult, setMiddleResult] = useState<MiddleResult>({middleUserSpeed: 0, middleUserAccuracy: 0});
	const [bestResult, setBestResult] = useState<BestResult>({bestUserSpeed: 0, bestUserAccuracy: 0})
	const [lastResults, setLastResults] = useState<Results[] | undefined>(undefined);


	let user: User = {
		userName: localStorage.getItem('userName'),
		userAccuracy: localStorage.getItem('userAccuracy'),
		userSpeed: localStorage.getItem('userSpeed'),
		userRang: localStorage.getItem('userRang'),
		userBestResult: {
			userBestAccruracy: localStorage.getItem('userBestAccuracy'),
			userBestSpeed: localStorage.getItem('userBestSpeed')
		},
		userMiddleResult: {
			userMiddleAccruracy: localStorage.getItem('userMiddleAccuracy'),
			userMiddleSpeed: localStorage.getItem('userMiddleSpeed'),
		}
	}

	// Ф-ция для сохранения в localstorage
	const saveLocal = (element: string | null, defenition: string | null) => {
		if (element !== null && defenition !== null) {
			localStorage.setItem(element, defenition)
		}
	}


	const getAllUserResults = () => {
		const results = [];
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			if (key && key.startsWith('userResult_')) {
				const result = JSON.parse(localStorage.getItem(key)!);
				results.push(result);
			}
		}
		results.sort((a, b) => Number(a.id) - Number(b.id));
		return results;
	};

	useEffect(() => {
		const results = getAllUserResults();

		if (JSON.stringify(results) !== JSON.stringify(lastResults)) {
			setLastResults(results);
		}
		// setLastResults(results);
		// }, [lastResults]);
	}, [lastResults]);

	const handleDeleteResult = (id: number) => {
		localStorage.removeItem(`userResult_${id}`);
		const updatedResults = getAllUserResults();
		setLastResults(updatedResults);
	};

	// Вводимые данные в поле input для name
	const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	}

	// Ф-ция для отправки в localstorage и закрытия модального окна
	function handleSubmit() {
		if (name) {
			saveLocal('userName', name);
			setIsModalOpen(false);
		} else {
			alert('Please enter a valid username')
		}
	}

	// Ф-ция для очистки localstorage, очистки всех данных
	function clearLocal() {
		localStorage.clear();
		setIsOpenClearModal(false);
		setName('');
		setIsModalOpen(true);
		setLastResults([]);
		setRang('');
		setBestResult({bestUserSpeed: 0, bestUserAccuracy: 0});
		setMiddleResult({middleUserSpeed: 0, middleUserAccuracy: 0});
	}

	// Ф-ция для поиска среднего и лучшего результатов
	function findMiddleAndBestResult(res: Results[]) {
		if (res.length === 0) {
			setMiddleResult({middleUserSpeed: 0, middleUserAccuracy: 0});
			setBestResult({bestUserSpeed: 0, bestUserAccuracy: 0});
			return;
		} else {
			res.sort((a, b) => b.userSpeed - a.userSpeed);
			let speeds: number[] = [];
			let accuracy: number[] = []

			for (const element of res) {
				speeds.push(element.userSpeed);
				accuracy.push(element.userAccuracy)
			}
			let middleSpeed = +(speeds.reduce((a, b) => a + b, 0) / speeds.length).toFixed(1);
			let middleAccuracy = +(accuracy.reduce((a, b) => a + b, 0) / accuracy.length).toFixed(1);

			const middleResult: MiddleResult = {
				middleUserSpeed: middleSpeed,
				middleUserAccuracy: middleAccuracy,
			}
			setMiddleResult(middleResult);

			let bestSpeed: number = 0;
			let bestAccuracy: number = 0;

			if (res) {
				bestSpeed = res[0].userSpeed;
				bestAccuracy = res[0].userAccuracy;
			}

			const bestResults: BestResult = {
				bestUserSpeed: bestSpeed,
				bestUserAccuracy: bestAccuracy,
			}
			setBestResult(bestResults);
		}
	}

	useEffect(() => {
		if (lastResults && lastResults.length > 0) {
			findMiddleAndBestResult(lastResults);
		}
	}, [lastResults]);

	useEffect(() => {
		if (middleResult.middleUserSpeed !== 0) {
			let res = JSON.stringify(middleResult);
			localStorage.setItem('middleResult', res);
		}
	}, [middleResult]);

	useEffect(() => {
		if (bestResult.bestUserSpeed !== 0 && bestResult) {
			let res = JSON.stringify(bestResult);
			localStorage.setItem('bestResult', res);
		}
	}, [bestResult]);

	// 	Задаем ранги
	useEffect(() => {
		if (
			bestResult.bestUserSpeed >= 350 &&
			bestResult.bestUserAccuracy >= 99
		) {
			setRang('Platinum');
		} else if (
			bestResult.bestUserSpeed >= 300 &&
			bestResult.bestUserAccuracy >= 97
		) {
			setRang('Gold');
		} else if (
			bestResult.bestUserSpeed >= 250 &&
			bestResult.bestUserAccuracy >= 95
		) {
			setRang('Silver');
		} else if (
			bestResult.bestUserSpeed >= 200 &&
			bestResult.bestUserAccuracy >= 93
		) {
			setRang('Bronze');
		} else {
			setRang('Beginner');
		}
	}, [bestResult.bestUserSpeed, bestResult.bestUserAccuracy]);

	return (
		<div className={style.container}>
			{/* Если нет userName, выдаем модальное окно для его ввода*/}
			{user.userName === null ?
				<Modal
					className={style.modal}
					isOpen={isModalOpen}
				>
					<div className={style.divInput}>
						<label htmlFor="username">
							Ваше Имя
						</label>
						<div className={style.inputAndButton}>
							<input
								type="text"
								placeholder='Введите ваше имя или псевдоним'
								name='username'
								onChange={inputChange}
								value={name || ''}
								onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
							/>


							<button className={style.buttonSave} onClick={handleSubmit}>
								Save
							</button>
						</div>
					</div>

				</Modal>
				:
				// Если есть данные о username, то выдаем основной контент.
				(<div className={style.wrapper}>

					{/* Модальное окно для подтверждения удаления */}
					<Modal isOpen={isOpenClearModal} className={style.modal}>
						<h2>Подтвердить удаление</h2>
						<div className={style.delButtons}>
							<button onClick={clearLocal}>Да</button>
							<button onClick={() => setIsOpenClearModal(false)}>Нет</button>
						</div>

					</Modal>

					<div className={style.top}>
						<div className={style.profile}>

							<h1> {user.userName} </h1>

							<h2> Ваш ранг:
								{
									bestResult.bestUserSpeed !== 0 && !isNaN(bestResult.bestUserSpeed) ? (
										<span> {rang}</span>
									) : <p> - </p>
								}
							</h2>

							<h2>
								Лучший результат:
								{
									middleResult.middleUserSpeed !== 0 && !isNaN(middleResult.middleUserSpeed) ? (
										<div>
											<p>Скорость: <span>{bestResult.bestUserSpeed}</span> зн/м</p>
											<p>Точность: <span>{bestResult.bestUserAccuracy}</span> %</p>
										</div>
									) : <p> - </p>
								}

							</h2>

							<h2 className={style.h2NotBottom}>
								Средний результат:
								{
									middleResult.middleUserSpeed !== 0 && !isNaN(bestResult.bestUserSpeed) ? (
										<div>
											<p>Скорость: <span>{middleResult.middleUserSpeed}</span> зн/м</p>
											<p>Точность: <span>{middleResult.middleUserAccuracy}</span> %</p>
										</div>
									) : <p> - </p>
								}
							</h2>
						</div>

						<div className={style.lastResults}>
							<h1> Предыдущие результаты: </h1>
							{
								lastResults ? (
									<div className={style.lastResultsMap}>
										{
											lastResults.map((result) => (
												<LastResults
													speed={result.userSpeed}
													accuracy={result.userAccuracy}
													id={result.id}
													key={result.id}
													onDelete={handleDeleteResult}
												/>
											))
										}
									</div>
								) : <p> - </p>
							}
						</div>
					</div>


					<button
						className={style.deleteButton}
						onClick={() => setIsOpenClearModal(true)}
					>
						Удалить профиль
					</button>
				</div>)
			}

		</div>
	);
};

export default UserPage;

