/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React 		from 'react';
import { createRoot } from 'react-dom/client';
import Logger 		from '../Logger';

export default class ReactDomFactory {

	rootRender;
	constructor() {
		this.rootRender = null;

		this.inject = this.inject.bind(this);
		this.dispose = this.dispose.bind(this);
	}

	/**
	* Injects a react component
	* @param {object}			module		- The react component
	* @param {object}			props		- Props to initiate component with
	* @param {HTMLElement}		target		- The target element to inject to
	*/
	static inject(module, props = {}, target) {
		if (target) {
			const root = createRoot(target);
			root.render(React.createElement(module, props || {}));
			return root;
		} else {
			Logger.warn('RHW07', 'Target element is null or undefined.');
		}
	}

	/**
	 *  Disposes a react component
	 * @param {HTMLElement}		target		- The target element to dispose
	 */
	static dispose(target, rootRef) {
		if (target && rootRef) {
			rootRef.unMount();
		}
	}

}
