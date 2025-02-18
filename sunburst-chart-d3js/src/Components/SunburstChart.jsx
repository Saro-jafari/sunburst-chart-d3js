import Chart from './Chart';
const data = {
	how: [
		{ question: 'how to start a business', searchVolume: 45000 },
		{ question: 'how to lose weight fast', searchVolume: 67000 },
		{ question: 'how to learn programming', searchVolume: 36000 },
		{ question: 'how to bake a cake', searchVolume: 25000 },
		{ question: 'how to invest in stocks', searchVolume: 59000 },
	],
	who: [
		{ question: 'who invented the internet', searchVolume: 12000 },
		{ question: 'who is the richest person in the world', searchVolume: 50000 },
		{ question: 'who won the world cup 2022', searchVolume: 32000 },
		{ question: 'who discovered gravity', searchVolume: 15000 },
		{ question: 'who wrote the Harry Potter books', searchVolume: 28000 },
	],
	why: [
		{ question: 'why is the sky blue', searchVolume: 42000 },
		{ question: 'why do cats purr', searchVolume: 39000 },
		{ question: 'why do we dream', searchVolume: 45000 },
		{ question: 'why does coffee make you poop', searchVolume: 25000 },
		{ question: 'why is the ocean salty', searchVolume: 27000 },
	],
	will: [
		{ question: 'will AI take over jobs', searchVolume: 53000 },
		{ question: 'will it rain tomorrow', searchVolume: 60000 },
		{ question: 'will the stock market crash', searchVolume: 47000 },
		{ question: 'will humans go to Mars', searchVolume: 34000 },
		{ question: 'will electric cars replace gas cars', searchVolume: 28000 },
	],
	can: [
		{ question: 'can dogs eat chocolate', searchVolume: 51000 },
		{ question: 'can I travel with an expired passport', searchVolume: 27000 },
		{ question: 'can you get rich from crypto', searchVolume: 39000 },
		{ question: 'can humans live on Mars', searchVolume: 35000 },
		{ question: 'can AI create art', searchVolume: 44000 },
	],
	are: [
		{ question: 'are aliens real', searchVolume: 57000 },
		{ question: 'are electric cars better than gas cars', searchVolume: 43000 },
		{ question: 'are eggs good for you', searchVolume: 38000 },
		{ question: 'are video games bad for kids', searchVolume: 36000 },
		{ question: 'are humans omnivores', searchVolume: 25000 },
	],
};
const sunburstData = {
	name: 'Questions',
	children: [
		{
			name: 'How',
			children: data.how.map(item => ({
				name: item.question,
				value: item.searchVolume, 
			})),
		},
		{
			name: 'Who',
			children: data.who.map(item => ({
				name: item.question,
				value: item.searchVolume,
			})),
		},
		{
			name: 'Why',
			children: data.why.map(item => ({
				name: item.question,
				value: item.searchVolume,
			})),
		},
		{
			name: 'Will',
			children: data.will.map(item => ({
				name: item.question,
				value: item.searchVolume,
			})),
		},
		{
			name: 'Can',
			children: data.can.map(item => ({
				name: item.question,
				value: item.searchVolume,
			})),
		},
		{
			name: 'Are',
			children: data.are.map(item => ({
				name: item.question,
				value: item.searchVolume,
			})),
		},
	],
};

function SunburstChart() {
	return <Chart data={sunburstData} />;
}

export default SunburstChart;
