import React, {useState, useEffect, useRef} from 'react';
import style from './header.module.scss';
import {VscAccount} from "react-icons/vsc";
import {BsKeyboard} from "react-icons/bs";
import {Link} from 'react-router-dom';
import {RxHamburgerMenu} from "react-icons/rx";
import {IoCloseOutline} from "react-icons/io5";

const Header: React.FC = () => {
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleDropDown = () => {
		setIsDropDownOpen(!isDropDownOpen);
	};

	// Обработчик клика вне контейнера
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsDropDownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		// Очистка обработчика при размонтировании компонента
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className={style.container}>
			<div className={style.wrapper}>
				<div className={style.links}>
					<Link to='/'>
						<button>
							<BsKeyboard className={`${style.icon} ${style.firstIcon}`}/>
							<p>
								KeyPulse
							</p>
						</button>
					</Link>
				</div>
				<div className={style.links} ref={dropdownRef}>
					<button onClick={toggleDropDown} className={style.dropButton}>
						{isDropDownOpen ? (
							<IoCloseOutline className={style.dropicon}/>
						) : (
							<RxHamburgerMenu className={style.dropicon}/>
						)}
					</button>

					{isDropDownOpen && (
						<div className={style.dropdown}>
							<Link to='/'>
								<button onClick={toggleDropDown}>
									<VscAccount className={`${style.icon} ${style.secondIcon}`}/>
									<p>
										Тест печати
									</p>
								</button>
							</Link>

							<Link to='/user'>
								<button onClick={toggleDropDown}>
									<VscAccount className={`${style.icon} ${style.secondIcon}`}/>
									<p>
										Мой профиль
									</p>
								</button>
							</Link>

							<Link to='/learning'>
								<button onClick={toggleDropDown}>
									<VscAccount className={`${style.icon} ${style.secondIcon}`}/>
									<p>
										Обучение
									</p>
								</button>
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Header;