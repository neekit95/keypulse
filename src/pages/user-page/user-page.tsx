import React, {useState} from 'react';
import style from './user-page.module.scss'
import Modal from 'react-modal';

const UserPage = () => {
	const [name, setName] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(true);
	const [readyToClear, setReadyToClear] = useState(false);
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


	const saveLocal = (element: string | null, defenition: string | null) => {
		if (element !== null && defenition !== null) {
			localStorage.setItem(element, defenition)
		}
	}

	const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	}

	function handleSubmit() {
		if (name) {
			saveLocal('userName', name);
			setIsModalOpen(false);
		} else {
			alert('Please enter a valid username')
		}
	}

	function clearLocal() {
		localStorage.clear();
		setIsOpenClearModal(false);
		setName('');
		setIsModalOpen(true);

	}

	return (
		<div className={style.container}>
			{user.userName === null ?
				<Modal className={style.modal}
					   isOpen={isModalOpen}>
					<div className={style.divInput}>
						<label htmlFor="username">
							UserName:
						</label>
						<input
							type="text"
							placeholder='Enter your username'
							name='username'
							onChange={inputChange}
							value={name || ''}
							onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
						/>

					</div>
					<button className={style.buttonSave} onClick={handleSubmit}>
						Save
					</button>
				</Modal> :
				(<div className={style.wrapper}>
					<Modal isOpen={isOpenClearModal} className={style.modal}>
						<h2>Подтвердить удаление</h2>
						<button onClick={clearLocal}>Да</button>
						<button onClick={() => setIsOpenClearModal(false)}>Нет</button>
					</Modal>
					<div className={style.profile}>
						<h1>
							{user.userName}
						</h1>
						<h2>
							Ваш ранг:
							{
								user.userRang ? (
										<span>
							{user.userRang}
							</span>
									) :
									<p>
										Пройдите тест
									</p>
							}

						</h2>
						<h2>
							Лучший результат:
							<p>Точность: <span>{user.userBestResult.userBestSpeed}</span> %</p>
							<p>Скорость: <span>{user.userBestResult.userBestSpeed}</span> зн/м</p>
						</h2>
						<h2 className={style.h2NotBottom}>
							Средний результат:
							<p>Точность: <span>{user.userMiddleResult.userMiddleSpeed}</span> %</p>
							<p>Скорость: <span>{user.userMiddleResult.userMiddleSpeed}</span> зн/м</p>
						</h2>
					</div>

					<div className={style.lastResults}>

					</div>
					<button onClick={() => setIsOpenClearModal(true)}>
						Удалить данные
					</button>
				</div>)
			}

		</div>
	);
};

export default UserPage;

