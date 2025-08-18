import { createEvent, createStore } from 'effector';

export enum FilterTabVariant {
	sort = 'sort',
	filters = 'Filters',
	keywords = 'Keywords',
	rating = 'Rating',
}

export const $selectedTabsFilters = createStore<FilterTabVariant[]>([]);
export const $openedFilterTab = createStore<FilterTabVariant | null>(null);

export const addSelectedTabFilters = createEvent<FilterTabVariant>();
export const removeSelectedTabFilters = createEvent<FilterTabVariant>();

export const openFilterTab = createEvent<FilterTabVariant>();
export const closeFilterTab = createEvent();

$selectedTabsFilters.on(addSelectedTabFilters, (state, payload) => {
	if (!state.includes(payload)) {
		return [...state, payload];
	}
	return state;
});

$selectedTabsFilters.on(removeSelectedTabFilters, (state, payload) => {
	return state.filter(tab => tab !== payload);
});

$openedFilterTab.on(openFilterTab, (_, payload) => payload);
$openedFilterTab.on(closeFilterTab, () => null);
