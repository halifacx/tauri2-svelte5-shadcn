import { invoke } from "@tauri-apps/api/core";

export const preventDefault = <T extends Event>(fn: (e: T) => void): ((e: T) => void) => {
	return (e: T) => {
		e.preventDefault();
		fn(e);
	};
};

export class GlobalState {
	private _state = $state({ name: '', greet: '' });

	get greet() {
		return this._state.greet;
	}
	async submit() {
		this.greet = await invoke('greet', { name: this.name });
	}

	reset() {
		this.name = '';
		this.greet = '';
	}
}
