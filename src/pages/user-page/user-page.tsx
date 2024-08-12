import React, {useState} from 'react';
import style from './user-page.module.scss'
import Modal from 'react-modal';

const UserPage = () => {
	const [name, setName] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(true);
	const [isOpenClearModal, setIsOpenClearModal] = useState(false);

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

	}


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
									user.userRang ? (
											<span> {user.userRang}</span>
										) :
										<p> - </p>
								}
							</h2>

							<h2>
								Лучший результат:
								{
									user.userAccuracy ? (
										<div>
											<p>Точность: <span>{user.userBestResult.userBestSpeed}</span> %</p>
											<p>Скорость: <span>{user.userBestResult.userBestSpeed}</span> зн/м</p>
										</div>
									) : <p> - </p>
								}

							</h2>

							<h2 className={style.h2NotBottom}>
								Средний результат:
								{
									user.userAccuracy ? (
										<div>
											<p>Точность: <span>{user.userMiddleResult.userMiddleSpeed}</span> %</p>
											<p>Скорость: <span>{user.userMiddleResult.userMiddleSpeed}</span> зн/м</p>
										</div>
									) : <p> - </p>
								}
							</h2>
						</div>
						<div className={style.lastResults}>
							<h1> Предыдущие результаты: </h1>
							{
								user.userAccuracy ? (
									<div>
										<p>Точность: <span>{user.userMiddleResult.userMiddleSpeed}</span> %</p>
										<p>Скорость: <span>{user.userMiddleResult.userMiddleSpeed}</span> зн/м</p>
									</div>
								) : <p> - </p>
							}
						</div>
					</div>


					<button
						className={style.deleteButton}
						onClick={() => setIsOpenClearModal(true)}
					>
						Удалить данные
					</button>
				</div>)
			}

		</div>
	);
};

export default UserPage;

