const keywords = ['class', 'void', 'int', 'return', 'pragma', 'include', 'public', 'private', 'const', 'static', 'true', 'false', 'null', 'NULL', 'nullptr', 'for', 'if', 'while', 'else', 'enum', 'struct', 'typedef', 'struct', 'union', 'assert', 'virtual', 'unsigned', 'char', 'long', 'double'];

const ColorMapping = {
	keywords: "#569cd6",
	doubleQuotationStrings: "#ce9178",
	singleQuotationStrings: "#ce9178",
	comments: "gray",
};

function coloredSpan(content, color) {
	return `<span style="color: ${color}">${content}</span>`;
}

function generateKeywordRegexRule() {
	const keywordsOr = keywords.join('|');
	return new RegExp(`\\b(${keywordsOr}|\\.\\w+)(?=[^\w])`, 'g');
}

const RegexRules = {
	keywords: generateKeywordRegexRule(),
	singleLineComments: new RegExp('(\/\/.*)', 'g'),
	multiLineComments: new RegExp(/(\/\*[^*]*\*+(?:[^\/*][^*]*\*+)*\/)/gm),
	doubleQuotationStrings: new RegExp('"(.*?)"', 'g'),
	singleQuotationStrings: new RegExp(/'(.*?)'/g)
};

export function highlight(element) {
	console.log(RegexRules.multiLineComments);
	console.log(RegexRules.multiLineComments.test(element.innerText));

	/*
	let replaceBy = element.innerText
		.replace(RegexRules.multiLineComments, coloredSpan('$1', 'gray'));
	element.innerHTML = replaceBy.split('\n').join('<br/>');
	*/

	/*
	const replaceBy = element.innerText
		.replace('<', '&lt')
		.replace('>', '&gt')
		.replace(RegexRules.doubleQuotationStrings, coloredSpan('"$1"', ColorMapping.doubleQuotationStrings))
		.replace(RegexRules.keywords, coloredSpan('$1', ColorMapping.keywords))
		.replace(RegexRules.multiLineComments, coloredSpan('$1', ColorMapping.comments))
		.replace(RegexRules.singleLineComments, coloredSpan('<em>$1</em>', ColorMapping.comments))
	element.innerHTML = replaceBy.split('\n').join('<br/>');
	*/

	for (const node of element.children) {
		const replaceBy = node.innerText
			.replace('<', '&lt')
			.replace('>', '&gt')
			.replace(RegexRules.doubleQuotationStrings, coloredSpan('"$1"', ColorMapping.doubleQuotationStrings))
			.replace(RegexRules.singleQuotationStrings, coloredSpan('\'$1\'', ColorMapping.singleQuotationStrings))
			.replace(RegexRules.singleLineComments, coloredSpan('<em>$1</em>', ColorMapping.comments))
			.replace(RegexRules.keywords, coloredSpan('$1', ColorMapping.keywords))
		node.innerHTML = replaceBy.split('\n').join('<br/>');
	}
}
