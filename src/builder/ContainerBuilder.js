/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Logger           from '../Logger';
import Registration     from '../Registration';
import Container        from '../Container';
import ReactDomFactory  from '../factories/ReactDomFactory';

export default class ContainerBuilder {
	constructor(options = null) {
		this._registrations = [];
		this._defaultOptions = options;
		this._factory = ReactDomFactory;
	}

	/**
	 * Register new component
	 * @param {function}        operator    - function that returns either a React Component or a Promise that resolves one
	 * @returns {Registration}
	 */
	register(operator) {
		const registration = new Registration(operator);
		if (this._defaultOptions) {
			registration.withOptions(this._defaultOptions);
		}
		this._registrations.push(registration);
		return registration;
	}

	/**
	 * Set the container factory
	 * @param {Object}  factory - The factory
	 */
	set factory(factory) {
		this._factory = factory;
	}

	/**
	 * Build the container
	 * @returns {Container}
	 */
	build() {
		return new Container(this._registrations.reduce((acc, registration) => {
			if (!registration.key) {
				Logger.error('RHEXX', 'Missing key for registration.');
				return acc;
			}

			if (acc[registration.key]) {
				Logger.warn('RHEXX', 'Duplicate key', registration.key);
			}

			acc[registration.key] = registration;
			return acc;
		}, {}), this._factory);
	}
}