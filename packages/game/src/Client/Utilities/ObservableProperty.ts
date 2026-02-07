export type Listener<T> = (value: T | undefined) => void;

export default class ObservableProperty<T, Value = T & { _state?: number; }> {
    private _value?: Value;
    private listeners = new Set<Listener<Value>>();

    constructor(initialValue?: Value) {
        this.value = initialValue;
    }

    get value(): Value | undefined {
        return this._value;
    }

    set value(value: Value | undefined) {
        this._value = value;
        this.listeners.forEach(l => l(value));
    }

    subscribe(listener: Listener<Value>) {
        this.listeners.add(listener);
        
        return () => {
            this.listeners.delete(listener);
        };
    }

    update() {
        this.listeners.forEach(l => l({...this._value, _state: performance.now()} as Value));
    }
};
