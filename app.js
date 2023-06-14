const express = require('express');
const app = express();

const ExpressError = require('./expressError');

app.use(express.json());

const {
	convertAndValidateNumsArray,
	findMode,
	findMean,
	findMedian,
} = require('./helpers');

app.get('/mean', function (req, res, next) {
	if (!req.query.nums) {
		throw new ExpressError(
			'You must pass a query key of nums with a comma-separated list of numbers.',
			400
		);
	}
	let numsAsStrings = req.query.nums.split(',');
	// check if anything bad was put in
	let nums = convertAndValidateNumsArray(numsAsStrings);
	if (nums instanceof Error) {
		throw new ExpressError(nums.message);
	}

	let result = {
		operation: 'mean',
		result: findMean(nums),
	};

	return res.send(result);
});

app.get('/median', function (req, res, next) {
	if (!req.query.nums) {
		throw new ExpressError(
			'You must pass a query key of nums with a comma-separated list of numbers.',
			400
		);
	}
	let numsAsStrings = req.query.nums.split(',');
	// check if anything bad was put in
	let nums = convertAndValidateNumsArray(numsAsStrings);
	if (nums instanceof Error) {
		throw new ExpressError(nums.message);
	}

	let result = {
		operation: 'median',
		result: findMedian(nums),
	};

	return res.send(result);
});

app.get('/mode', function (req, res, next) {
	if (!req.query.nums) {
		throw new ExpressError(
			'You must pass a query key of nums with a comma-separated list of numbers.',
			400
		);
	}
	let numsAsStrings = req.query.nums.split(',');
	// check if anything bad was put in
	let nums = convertAndValidateNumsArray(numsAsStrings);
	if (nums instanceof Error) {
		throw new ExpressError(nums.message);
	}

	let result = {
		operation: 'mode',
		result: findMode(nums),
	};

	return res.send(result);
});

app.use((req, res, next) => {
	const e = new ExpressError('Page Not Found', 404);
	next(e);
});

app.use((err, req, res, next) => {
	// the default status is 500 Internal Server Error
	let status = err.status || 500;
	let message = err.msg;

	// set the status and alert the user
	return res.status(status).json({
		error: { message, status },
	});
});

app.listen(3000, () => {
	console.log('Server running on port 3000');
});
