import { FC } from 'react'
import style from './loader.module.css'
import { LoaderSvg } from './loader.svg'

const loaderSizes = {
	small: 16,
	medium: 24,
	large: 80,
}

type TLoaderProps = {
	size: 'small' | 'medium' | 'large'
	inverse?: boolean
}
export const Loader: FC<TLoaderProps> = ({ size, inverse = false }) => {
	const loaderColor = inverse ? '#fff' : '#3C39EC'

	const wrapperStyleKey = 'wrapper_' + size
	return (
		<div className={style[wrapperStyleKey]}>
			<LoaderSvg color={loaderColor} size={loaderSizes[size]} />
		</div>
	)
}
