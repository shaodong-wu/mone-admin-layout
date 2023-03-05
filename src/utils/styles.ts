export function styleValue(styles: any): string {
	if (styles instanceof Array) {
		return styles
			.filter(function (item) {
				return !!item;
			})
			.map(function (item) {
				return styleValue(item);
			})
			.join(';');
	}

	if (styles instanceof Object) {
		return Object
			.keys(styles)
			.filter(function (key) {
				return styles[key] != null && styles[key] !== '';
			})
			.map(function (key) {
				return [kebabCase(key), [addUnit(styles[key])]].join(':');
			})
			.join(';');
	}

	return styles;
}

/**
 * 转换字符串string为kebab case.
 *
 * @param word
 * @returns
 */
export function kebabCase(word: string) {
	return word.replace(/[A-Z]/g, (i) => `-${i}`).toLowerCase();
}

/**
 * 添加像素单位
 *
 * @param value
 * @returns
 */
export function addUnit(value: unknown) {
	switch (typeof (value)) {
		case "number":
			return `${value}px`;
		default:
			return value;
	}
}
