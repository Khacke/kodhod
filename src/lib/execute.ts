import YAML from 'yaml';

export async function executeCode(language: number, code: string, test: string, userId: string) {
	const yaml = getYaml(language, userId, code, test);

	const tork_response = await fetch(`http://${process.env.TORK_URL}/jobs`, {
		method: 'POST',
		headers: {
			'Content-Type': 'text/yaml',
		},
		body: yaml.toString(),
	});

	if (!tork_response.ok) {
		console.error(`Failed to create a job ${tork_response.statusText}`);
		return;
	}
	const data = await tork_response.json();

	const result = await pollJobCompletion(data.id);

	console.log(result);
	return result;
}

function getYaml(language: number, userId: string, code: string, test: string): string {
	switch (language) {
		case 1:
			return buildYaml(
				userId,
				'node:lts-slim',
				'solution.js',
				code,
				'solution.test.js',
				test,
				'node solution.test.js > $TORK_OUTPUT'
			);
		case 3:
			return buildYaml(
				userId,
				'python:3-slim',
				'solution.py',
				code,
				'test_solution.py',
				test,
				'python test_solution.py > $TORK_OUTPUT'
			);
		default:
			return '';
	}
}

function buildYaml(
	userId: string,
	image: string,
	codeName: string,
	code: string,
	testName: string,
	test: string,
	run: string
) {
	const jobJson = {
		name: userId,
		tasks: [
			{
				name: userId,
				image: image,
				run: run,
				files: {
					[codeName]: code,
					[testName]: test,
				},
				limits: {
					cpus: 0.5,
					memory: '100m',
				},
				timeout: '15s',
				networks: ['none'],
			},
		],
	};

	return YAML.stringify(jobJson);
}

async function pollJobCompletion(jobId: string) {
	const START_TIME = Date.now();
	const TIMEOUT = 15000;
	const POLL_INTERVAL = 100;

	while (Date.now() - START_TIME < TIMEOUT) {
		const response = await fetch(`http://${process.env.TORK_URL}/jobs/${jobId}`);

		const jobData = await response.json();

		switch (jobData.state) {
			case 'COMPLETED':
				return {
					exitCode: 0,
					result: { completed: true },
					timedOut: false,
					type: 'Success',
				};
			case 'FAILED':
				return {
					exitCode: 1,
					result: { completed: false },
					stdErr: jobData.execution[0].error,
					timedOut: false,
					type: 'Success',
				};
			case 'RUNNING':
				await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));
				continue;
			default:
				throw new Error(`Unexpected job state: ${jobData}`);
		}
	}

	return {
		exitCode: 0,
		result: { completed: false },
		timedOut: true,
		type: 'Timeout',
	};
}
