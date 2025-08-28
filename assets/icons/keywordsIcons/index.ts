import { FC } from 'react';
import { SvgProps } from 'react-native-svg';
import AlertIcon from './alert-icon.svg';
import BagMoneyIcon from './bag-money-icon.svg';
import BearIcon from './bear-icon.svg';
import BellIcon from './bell-icon.svg';
import BoltIcon from './bolt-icon.svg';
import BullIcon from './bull-icon.svg';
import CalendarIcon from './calendar-icon.svg';
import ChartDownIcon from './chart-down-icon.svg';
import ChartUpIcon from './chart-up-icon.svg';
import CheckIcon from './check-icon.svg';
import ConfettiIcon from './confetti-icon.svg';
import CongressIcon from './congress-icon.svg';
import CrownIcon from './crown-icon.svg';
import DealIcon from './deal-icon.svg';
import EyeOpenedIcon from './eye-opened-icon.svg';
import FileIcon from './file-icon.svg';
import FireIcon from './fire-icon.svg';
import FlagIcon from './flag-icon.svg';
import LightIcon from './light-icon.svg';
import LikeIcon from './like-icon.svg';
import MagnifierIcon from './magnifier-icon.svg';
import MegaphoneIcon from './megaphone-icon.svg';
import PeopleIcon from './people-icon.svg';
import PlanetIcon from './planet-icon.svg';
import RocketIcon from './rocket.svg';
import ShieldIcon from './shield-icon.svg';
import SmileIcon from './smile-icon.svg';
import StarIcon from './star-icon.svg';
import TargetIcon from './target-icon.svg';
import TimerIcon from './timer-icon.svg';

export const keywordsIcons: Record<string, FC<SvgProps>> = {
	like: LikeIcon,
	bolt: BoltIcon,
	rocket: RocketIcon,
	timer: TimerIcon,
	fire: FireIcon,
	'chart-up': ChartUpIcon,
	'chart-down': ChartDownIcon,
	bear: BearIcon,
	bull: BullIcon,
	'bag-money': BagMoneyIcon,
	target: TargetIcon,
	'eye-opened': EyeOpenedIcon,
	star: StarIcon,
	light: LightIcon,
	magnifier: MagnifierIcon,
	shield: ShieldIcon,
	file: FileIcon,
	crown: CrownIcon,
	confetti: ConfettiIcon,
	deal: DealIcon,
	congress: CongressIcon,
	calendar: CalendarIcon,
	bell: BellIcon,
	people: PeopleIcon,
	planet: PlanetIcon,
	check: CheckIcon,
	smile: SmileIcon,
	megaphone: MegaphoneIcon,
	alert: AlertIcon,
	flag: FlagIcon,
};
