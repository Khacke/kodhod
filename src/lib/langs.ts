import { langs } from '@uiw/codemirror-extensions-langs';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { rust } from '@codemirror/lang-rust';
import { cpp } from '@codemirror/lang-cpp';
import { csharp } from '@replit/codemirror-lang-csharp';
import { php } from '@codemirror/lang-php';

export const languages = {
	JavaScript: javascript(),
	TypeScript: langs.typescript(),
	C: langs.c(),
	'C++': cpp(),
	Python: python(),
	Java: java(),
	Rust: rust(),
	'C#': csharp(),
	PHP: php(),
};

export const idToLangFn = {
	1: languages.JavaScript,
	2: languages.TypeScript,
	3: languages.Python,
	4: languages['C#'],
	5: languages.C,
	6: languages['C++'],
	7: languages.Java,
	8: languages.Rust,
	9: languages.PHP,
};
