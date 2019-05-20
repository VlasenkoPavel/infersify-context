import 'reflect-metadata';
import { Container, interfaces } from 'inversify';
import { IDependencyLoader } from './types';

export class Context {
    protected static instance: Context;
    protected container: Container;

    constructor(option: interfaces.ContainerOptions) {
        this.container = new Container(option);
    }

    public static getInstance(option: interfaces.ContainerOptions = { defaultScope: 'Singleton' }) {
        if (!Context.instance) {
            Context.instance = new Context(option);
        }

        return Context.instance;
    }

    public load(...loaders: IDependencyLoader[]) {
        loaders.forEach(loader => loader.load(this.container));
    }

    public getComponent<T>(identifier: interfaces.ServiceIdentifier<T>): T {
        return this.container.get(identifier);
    }
}
