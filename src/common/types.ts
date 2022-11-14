import { Client, Collection, ClientOptions } from 'discord.js';

interface IMyClient {
    commands: Collection<any, any>;
}

export class MyClient extends Client implements IMyClient{
    commands: Collection<any, any>;
    constructor(options: ClientOptions) {
        super(options);
        this.commands = new Collection();
    }
}