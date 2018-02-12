import React from 'react';
import {
	View,
	Text,
	ListView
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import {
	openURL,
} from '../../util/general';
import {
} from '../../styles/ColorConstants';
import css from '../../styles/css';
import Touchable from '../common/Touchable';

const menuDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const DiningMenu = ({
	data,
	filters,
	addFilter,
	activeMeal
}) => {
	if (!data.menuItems && data.menuWebsite) {
		return (
			<Touchable
				onPress={() => openURL(data.menuWebsite)}
			>
				<View style={css.dd_menu_link_container}>
					{data.name.indexOf('Market') >= 0 ? (
						<Text style={css.dd_menu_link_text}>View To Go Menu</Text>
					) : (
						<Text style={css.dd_menu_link_text}>View Menu</Text>
					)}
				</View>
			</Touchable>
		);
	} else if (data.menuItems) {
		return (
			<View style={css.dd_menu_container}>
				<MenuFilters
					filters={filters}
					addFilter={addFilter}
					activeMeal={activeMeal}
				/>
				<MenuList
					filters={filters}
					data={data.menuItems}
					activeMeal={activeMeal}
				/>
			</View>
		);
	} else {
		return null;
	}
};

const MenuFilters = ({ filters, addFilter, activeMeal }) => (
	<View>
		<View style={css.dd_menu_food_type}>
			<TypeButton
				name="Vegetarian"
				type="VT"
				active={filters.indexOf('VT') >= 0}
				addFilter={addFilter}
			/>
			<TypeButton
				name="Vegan"
				type="VG"
				active={filters.indexOf('VG') >= 0}
				addFilter={addFilter}
			/>
			<TypeButton
				name="Gluten-Free"
				type="GF"
				active={filters.indexOf('GF') >= 0}
				addFilter={addFilter}
			/>
		</View>
		<View style={css.dd_menu_meal_type}>
			<MealButton
				name="Breakfast"
				active={activeMeal === 'Breakfast'}
				addFilter={addFilter}
			/>
			<MealButton
				name="Lunch"
				active={activeMeal === 'Lunch'}
				addFilter={addFilter}
			/>
			<MealButton
				name="Dinner"
				active={activeMeal === 'Dinner'}
				addFilter={addFilter}
			/>
		</View>
	</View>
);

/*
	Breakfast, Lunch, Dinner
*/
const MealButton = ({ name, active, addFilter }) => (
	<Touchable
		style={css.dd_menu_meal_button}
		onPress={() => addFilter(name)}
	>
		{ (active === true) ?
			(
				<View style={css.dd_menu_meal_button}>
					<View style={css.dd_menu_circle_active} />
					<Text style={css.dd_menu_meal_type_text_active}>{name}</Text>
				</View>) :
			(
				<View style={css.dd_menu_meal_button}>
					<View style={css.dd_menu_circle} />
					<Text style={css.dd_menu_meal_type_text}>{name}</Text>
				</View>
			)
		}
	</Touchable>
);

/*
	VT, VG, GF
*/
const TypeButton = ({
	name,
	type,
	active,
	addFilter
}) => (
	<Touchable
		onPress={() => addFilter(type)}
	>
		{active ? (
			<Text style={css.dd_menu_filter_button_active}>{name}</Text>
		) : (
			<Text style={css.dd_menu_filter_button}>{name}</Text>
		)}
	</Touchable>
);

const MenuList = ({ data, filters, activeMeal }) => {
	if (Array.isArray(data) && Array.isArray(filters)) {
		let menuItems = [];

		// Active Meal filter
		menuItems = data.filter((item) => {
			const itemTags = item.tags.toLowerCase();
			return ((itemTags.indexOf(activeMeal.toLowerCase()) >= 0) || (itemTags.indexOf(('ALL DAY').toLowerCase()) >= 0));
		});

		// Food Type filters
		filters.forEach((tag) => {
			menuItems = menuItems.filter((item) => {
				const itemTags = item.tags.toLowerCase();
				return (itemTags.indexOf(tag.toLowerCase()) >= 0);
			});
		});

		return (
			<ListView
				dataSource={menuDataSource.cloneWithRows(menuItems)}
				renderRow={(rowData, sectionID, rowID, highlightRow) => (
					<MenuItem
						key={rowID}
						data={rowData}
					/>
				)}
			/>
		);
	} else {
		return null;
	}
};

const MenuItem = ({ data }) => (
	<Touchable
		style={css.dd_menu_row}
		onPress={() => Actions.DiningNutrition({ menuItem: data })}
	>
		<Text style={css.dd_menu_item_name_text}>
			{data.name}
			<Text style={css.dd_menu_item_price_text}>
				(${data.price})
			</Text>
		</Text>
	</Touchable>
);

export default DiningMenu;