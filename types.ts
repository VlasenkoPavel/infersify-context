import { Container } from 'inversify';

export interface IDependencyLoader {
    load(container: Container): void;
}
