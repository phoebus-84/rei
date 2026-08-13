import { isSeoIntent } from '$lib/seo/intents';

export function match(param: string): boolean {
	return isSeoIntent(param);
}
