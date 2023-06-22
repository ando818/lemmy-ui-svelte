<script>

import { pickerController } from 'ionic-svelte';

	export const showPicker = async () => {
		const defaultColumnOptions = [['Dog', 'Cat', 'Bird', 'Lizard', 'Chinchilla']];
		const multiColumnOptions = [
			['Minified', 'Responsive', 'Full Stack', 'Mobile First', 'Serverless'],
			['Tomato', 'Avocado', 'Onion', 'Potato', 'Artichoke']
		];

		const numColumns = 1,
			numOptions = 5,
			columnOptions = defaultColumnOptions;

		function getColumns(numColumns, numOptions, columnOptions) {
			let columns = [];
			for (let i = 0; i < numColumns; i++) {
				columns.push({
					name: `col-${i}`,
					options: getColumnOptions(i, numOptions, columnOptions)
				});
			}

			return columns;
		}

		function getColumnOptions(columnIndex, numOptions, columnOptions) {
			let options = [];
			for (let i = 0; i < numOptions; i++) {
				options.push({
					text: columnOptions[columnIndex][i % numOptions],
					value: i
				});
			}

			return options;
		}

		const options = {
			columns: getColumns(numColumns, numOptions, columnOptions),
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel'
				},
				{
					text: 'Confirm',
					handler: (value) => {
						console.log(`Got Value ${value}`);
					}
				}
			]
		};

		const picker = await pickerController.create(options);
		picker.present();
	};
</script>
