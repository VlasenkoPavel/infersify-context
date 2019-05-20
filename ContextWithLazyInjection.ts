import 'reflect-metadata';
import { interfaces } from 'inversify';
import inversifyInjectDecorators from 'inversify-inject-decorators';

import { Context } from './Context';
import { IDependencyLoader } from './types';

export class ContextWithLazyInjection extends Context {
    protected static instance: ContextWithLazyInjection;

    public static getInstance(option: interfaces.ContainerOptions = { defaultScope: 'Singleton' }) {
        if (!ContextWithLazyInjection.instance) {
            ContextWithLazyInjection.instance = new ContextWithLazyInjection(option);
        }

        return ContextWithLazyInjection.instance;
    }

    public load(...loaders: IDependencyLoader[]) {
        loaders.forEach(loader => loader.load(this.container));
    }

    public getComponent<T>(identifier: interfaces.ServiceIdentifier<T>): T {
        return this.container.get(identifier);
    }

    public getLazyInject() {
        return inversifyInjectDecorators(ContextWithLazyInjection.getInstance().container);
    }
}
